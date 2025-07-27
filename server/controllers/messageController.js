const { Message, User } = require("../models/Association") ;
const { Op, fn, col, literal } = require("sequelize");

exports.getRoomMessages = async (req, res) => {
    try {
        const { roomId } = req.params;
        const msgs = await Message.findAll({
            where: { roomId },
            order: [['createdAt', 'ASC']]
        });
        res.status(200).json({msgs})
    } catch (error) {
        res.status(500).json({message: "房間訊息資料獲取失敗", details: error.message})
    }
    
};

exports.getRooms = async (req, res) => {
    try {
        const userId = req.user.id
    
        // 先只查每個 roomId 的最後更新時間
        const roomsData = await Message.findAll({
        where: {
            [Op.or]: [
            { senderId: userId },
            { receiverId: userId }
            ]
        },
        attributes: [
            // 用 msg.roomId 來避免GROUP BY include
            // model name／alias → SQL 會長成 FROM \msgs` AS `msg``
            // table name → 真正的資料表叫 msgs，但在 SQL 裡已經有了 msg 這個別名
            // 直接用table name (msgs)，會跟 alias 衝突
            // 所以這邊要用model name
            [col("msg.roomId"), "roomId"],
            [fn("MAX", col("msg.updatedAt")), "lastUpdate"]
        ],
        group: ["msg.roomId"],
        order: [[literal("lastUpdate"), "DESC"]],
        raw: true  // 拿到純物件
        });

        // 找每個 roomId 裡的「對方 userId」
        const receiverIds = roomsData.map(r => {
        const [a, b] = r.roomId.split("_").map(n => Number(n));
        return a === userId ? b : a;
        });

        // 抓對方的資訊
        const users = await User.findAll({
        where: { id: receiverIds },
        attributes: ["id", "username", "avatarUrl"],
        raw: true
        });
        const usersMap = users.reduce((acc, u) => {
        acc[u.id] = u;
        return acc;
        }, {});

        // 組合，保證 receiverId 與 receiver 資料一致
        const rooms = roomsData.map(r => {
        const [a, b] = r.roomId.split("_").map(n => Number(n));
        const otherId = a === userId ? b : a;
        return {
            roomId: r.roomId,
            lastUpdate: r.lastUpdate,
            receiverId: otherId,
            receiver: usersMap[otherId] || null
        };
        });

        return res.status(200).json({ rooms });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '無法取得聊天室列表', details: error.message });
    }
}

exports.getLastMsg = async (req, res) => {
    try {
        const { roomId } = req.params;
        const msg = await Message.findOne({
            where: { roomId },
            order: [['updatedAt', 'DESC']],
            attributes: ['content', 'updatedAt', 'senderId'],
            raw: true
        });

        if (!msg) {
        return res.json({
            content: "",
            updatedAt: null,
            senderId: null
        });
        }

        return res.json(msg);
    } catch (error) {
        res.status(500).json({message: '獲取最後一則訊息失敗', details: error.message})
    }
};