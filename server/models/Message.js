const { Model, DataTypes } = require('sequelize')
const sqlize = require('../config/database')

class Message extends Model{}

Message.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        senderId: {type: DataTypes.INTEGER, allowNull: false, references: {model: "users", key: "id"}},
        receiverId: {type: DataTypes.INTEGER, allowNull: false, references: {model: "users", key: "id"}},
        content: {type: DataTypes.TEXT},
        roomId: {type: DataTypes.STRING, allowNull: false },
        messageType: {type: DataTypes.ENUM('text', 'image'), defaultValue: 'text'},
        isRead: {type: DataTypes.BOOLEAN, defaultValue: false}
    },
    {sequelize: sqlize, modelName:'msg', tableName:'msgs', timestamps: true}
)

module.exports = Message