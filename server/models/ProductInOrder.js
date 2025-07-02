const { Model, DataTypes } = require('sequelize')
const sqlize = require('../config/database')

class ProductInOrder extends Model{}

ProductInOrder.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        quantity: {type: DataTypes.INTEGER, allowNull: false},
        productId: {type: DataTypes.INTEGER, allowNull: false, references: {model: "products", key: "id"}},
        orderId: {type: DataTypes.INTEGER, allowNull: false, references: {model: "orders", key: "id"}}
    },
    {sequelize: sqlize, modelName:'pio', tableName:'pois', timestamps: true}
)

module.exports = ProductInOrder