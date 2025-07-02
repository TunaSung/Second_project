const { Model, DataTypes } = require('sequelize')
const sqlize = require('../config/database')

class Message extends Model{}

Message.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        message: {type: DataTypes.TEXT, allowNull: false},
        fromUserId: {type: DataTypes.INTEGER, allowNull: false, references: {model: "users", key: "id"}},
        toUserId: {type: DataTypes.INTEGER, allowNull: false, references: {model: "users", key: "id"}},
        productId: {type: DataTypes.INTEGER, references: {model: "products", key: "id"}},
        orderId: {type: DataTypes.INTEGER, references: {model: "orders", key: "id"}},
        isRead: {type: DataTypes.BOOLEAN, defaultValue: false}
    },
    {sequelize: sqlize, modelName:'msg', tableName:'msgs', timestamps: true}
)

module.exports = Message