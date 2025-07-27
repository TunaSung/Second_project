const Message = require("../models/Message") 

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(socket.id, '已連線')

        socket.on('subscribe', (roomId) => {
            socket.join(roomId)
            console.log('加入房間: ', roomId)
        })

        socket.on('unsubscribe', (roomId) => {
            socket.leave(roomId)
            console.log('離開房間', roomId)
        })

        socket.on("sendMessage", async ({ senderId, receiverId, content, roomId }) => {
            try {
                const message = await Message.create({
                senderId,
                receiverId,
                content,
                roomId,
                messageType: 'text',
                isRead: false,
                });
                io.to(roomId).emit("receiveMessage", message);
            } catch (err) {
                console.error("無法儲存訊息：", err);
            }
        });

        socket.on('disconnect', () => {
            console.log(socket.id, '已離開')
        })
    })
}