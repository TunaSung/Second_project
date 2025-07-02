const { Model, DataTypes } = require('sequelize')
const sqlize = require('../config/database')

class Product extends Model{}

Product.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull:false},
        price: {type: DataTypes.INTEGER, allowNull:false},
        stock: {type:DataTypes.INTEGER, allowNull:false},
        categoryID: {type: DataTypes.INTEGER},
        image: {type: DataTypes.STRING},

        hashTags: {type: DataTypes.STRING, // 預計是回傳array，但MySQL不支持.ARRAY
            set(value) { // 自動將回傳的array轉成string
                this.setDataValue('hashTags', value.join(','))
            },
            get(){ // 要被後端取出的時候把在資料庫的string轉回array
                const raw = this.getDataValue('hashTags')
                return raw ? raw.split(',') : []
            }
        }
    },
    {sequelize: sqlize, modelName:'product', tableName:'products', timestamps: true}
)

module.exports = Product