const { Message } = require("../models/Association") ;

exports.getRoomMessages = async (req, res) => {
    const { roomId } = req.params;
    const messages = await Message.findAll({
        where: { roomId },
        order: [['createdAt', 'ASC']]
    });
    res.json(messages);
};