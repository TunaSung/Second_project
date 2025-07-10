const { Model, DataTypes } = require('sequelize')
const sqlize = require('../config/database')

class Product extends Model{}

Product.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull:false},
        price: {type: DataTypes.INTEGER, allowNull:false},
        stock: {type:DataTypes.INTEGER, allowNull:false},
        sale: {type:DataTypes.INTEGER, defaultValue: 0},
        isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
        imageUrls: {type: DataTypes.JSON},
        categoryId: {type: DataTypes.INTEGER, references: {model: 'categories', key: 'id'}},        

        hashTags: {type: DataTypes.STRING, // 預計是回傳array，但MySQL不支持.ARRAY
            get(){ // 要被後端取出的時候把在資料庫的string轉回array
                const raw = this.getDataValue('hashTags')
                return raw ? raw.split(',') : []
            }
        },

        sellerId: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'users', key: "id"}}
    },
    {sequelize: sqlize, modelName:'product', tableName:'products', timestamps: true}
)

module.exports = Product