require('dotenv').config();
const ECPAY = require("../adapters/ecpay/ECPAY_Payment_node_js/lib/ecpay_payment");
const ProductInOrder = require("../models/ProductInOrder");
const Product = require("../models/Product");
const Order = require("../models/Order");
const crypto = require('crypto');
const authenticate = require('../middleware/JWT')
const options = require("../adapters/ecpay/ECPAY_Payment_node_js/conf/config-example");
const { HashKey, HashIV } = options.MercProfile;
const {Op} = require("sequelize")
const create = new ECPAY(options);

// 格式化日期
const formatDate = (date) => {
  const pad = (n) => n.toString().padStart(2, "0"); 
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};

//更改資order跟pios的狀態
exports.paymentStatus = async (req, res) => {
  const {ids, MerchantTradeNo} = req.body;
  const userId = req.user.id
  console.log(`ids: ${ids}, MerchantTradeNo: ${MerchantTradeNo}`)
  try {
    let order = await Order.findOne({
      where:{
        userId: userId,
        status: "pending",
        merchantTradeNo: null
      }
    });
  
    if (!order) {
      return res.status(404).send("No pending order to pay for");
    };

    order.merchantTradeNo = MerchantTradeNo;
    await order.save();
    
    await ProductInOrder.update(
      { status: "unpaid" },
      {
        where: {
          orderId: order.id,
          productId: {[Op.in]: ids}, //Op.in: ids => 在ids裡陣列裡的productId
          status: "pending"
        }
      }
    );

    // 3️⃣ 建立新訂單，留給「未被選中」的那些 pios
    const newOrder = await Order.create({
      userId,
      status: "pending",
      merchantTradeNo: null,
    });

    // 4️⃣ 把「未選中」的 pios 移到 newOrder
    await ProductInOrder.update(
      { orderId: newOrder.id },
      {
        where: {
          orderId: order.id,          // 原訂單 ID
          productId: { [Op.notIn]: ids },  //Op.in: ids => 不在ids裡陣列裡的productId
          status: "pending",               // 只移動還是pending的
        },
      });

    return res.status(200).send("Successfully updated order for payment");
  } catch (err) {
    console.error("Error updating Order:", err);
    return res.status(500).send("Unable to updated order for payment");
  }
}

// 全支付需要用到TotalAmount, ItemName
exports.createPaymentForm = async (req, res) => {
  const { TotalAmount, ItemName } = req.body;
  if (!TotalAmount || !ItemName) {
    return res.status(400).send("Missing TotalAmount or ItemName");
  }

  now = new Date()
  base_param = {
    MerchantTradeNo: "TEST" + new Date().getTime(), // 用當前時間戳來生成交易編號
    MerchantTradeDate: formatDate(now), // 當前時間，格式: YYYY/MM/DD HH:MM:SS
    TotalAmount, // 總金額，來自前端傳遞
    TradeDesc: "購物車結帳",
    ItemName, // 商品名稱，來自前端傳遞
    // ReturnURL: `${process.env.ECPAY_RETURN_URL}/api/payment/callback` 
    ReturnURL: `https://682057db46d9.ngrok-free.app/api/payment/callback` 
  };

  try {
    const htm = create.payment_client.aio_check_out_all(base_param); // 這裡會生成一個 HTML 表單，並自動提交到 ECPay 的支付頁面
    res.send(htm);
  } catch (error) {
    console.error("Error creating payment form:", error);
    res.status(500).send("Internal Server Error");
  }
}

// 綠界的編碼規定
const urlEncodeForECPay = (str) => {
  return encodeURIComponent(str)
    .toLowerCase()
    .replace(/%20/g, '+')
    .replace(/%2d/g, '-')
    .replace(/%5f/g, '_')
    .replace(/%2e/g, '.')
    .replace(/%21/g, '!')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%2a/g, '*');
};

// 驗證 CheckMacValue 的函式
const validateCheckValue = (params) => {
  let raw = '';
  // 過濾掉 CheckMacValue
  Object.keys(params)
    .filter(key => key !== 'CheckMacValue')
    .sort((a, b) => a.localeCompare(b))  // 按照字母進行升序排序
    .forEach(key => {
      raw += `${key}=${params[key]}&`;
    });

  // 前後加上HashKey, HashIV
  raw = `HashKey=${HashKey}&${raw}HashIV=${HashIV}`; //我沒有把上面的 raw 最後的 & 給去掉
  console.log('原始字串', raw);

  // ECPay規範的URL編碼
  const encoded = urlEncodeForECPay(raw); 
  console.log('編碼後', encoded);

  // SHA256加密並轉大寫
  const checkValue = crypto.createHash('sha256').update(encoded).digest('hex').toUpperCase();
  console.log('Generated CheckValue:', checkValue);
  console.log('Received CheckMacValue:', params.CheckMacValue);

  // 比對計算出的與回傳的CheckMacValue
  return checkValue === params.CheckMacValue;
};

// 處理支付回調的邏輯
exports.paymentCallback = async (req, res) => {
  const params = req.body; // 這裡的 params 是綠界回傳的資料
  console.log('Payment callback received:', params);
  // 驗證資料完整性
  if (!validateCheckValue(params)) {
    console.error('CheckValue 驗證失敗');
    return res.status(400).send('Invalid data');
  } else {
    console.log('CheckValue 驗證成功');
  }

  // 根據回傳結果處理
  if (params.RtnCode === '1') {
    // 交易成功
    console.log('交易成功:', params);
    try {
      // 假設你有一個 Order 模型來管理訂單
      const order = await Order.findOne({ where: { merchantTradeNo: params.MerchantTradeNo } });
      if (order) {
        order.status = 'paid'; // order更新狀態改成 paid
        await order.save();

        await ProductInOrder.update(
          { status: "paid" }, // pios更新狀態為 paid
          {
            where: {
              orderId: order.id,
              status: "unpaid"
            }
          }
        );

        // 更新商品銷售量
        const pios = await ProductInOrder.findAll({
          where: {
            orderId: order.id,
            status: 'paid'
          }
        });

        for (const { productId, amount } of pios) {
          const productItem = await Product.findByPk(productId)
          productItem.sale += amount
          productItem.stock -= amount
          if(productItem.stock === 0){
            productItem.isAvailable = false
          }
          await productItem.save();
        }

        console.log('訂單已更新為已付款');
        res.send('1|OK');
      } else {
        console.error('找不到該訂單');
        res.status(404).send('Order not found');
      }
    } catch (error) {
      console.error('更新訂單狀態時發生錯誤:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    // 交易失敗
    console.log('交易失敗:', params);
    res.status(400).send('Payment Failed');
  }
}