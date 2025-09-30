# Second_project — Real-time Marketplace

一個進階版的 **多賣家電商平台**，結合 **即時聊天功能** 與更完整的資料關聯設計。  
除了購物功能，買家能與賣家即時互動，提升交易體驗。  

---

## 功能特色
- 使用者註冊 / 登入
- 商品上架（支援多圖上傳，整合 **Cloudinary**）
- 商品分類、搜尋、標籤功能
- **即時聊天室**（Socket.IO）
  - 點商品卡片 → 建立聊天室房間 → 即時訊息互動
- 訂單與購物流程
- 串接 ECPay 全方位金流(測試帳號)，支援線上付款
- 前端採 **React + Tailwind**，搭配動畫效果

---

## 技術棧
- **Frontend**：React (Vite) + Tailwind CSS
- **Backend**：Node.js + Express + Socket.IO
- **Database**：MySQL + Sequelize ORM  
  - Models: User, Product, Order, Message, ProductInOrder
- **Cloud**：Cloudinary（商品圖片）
- **Deploy**：Railway


