const { Model, DataTypes } = require('sequelize') 
const sqlize = require('../config/database')

class User extends Model{}

User.init({
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    username: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING},
    avatarUrl:{type: DataTypes.STRING},

    creditCards: {type: DataTypes.STRING, // 預計是回傳array，但MySQL不支持.ARRAY
        set(value) { // 自動將回傳的array轉成string
            this.setDataValue('creditCards', value.join(','))
        },
        get(){ // 要被後端取出的時候把在資料庫的string轉回array
            const raw = this.getDataValue('creditCards')
            return raw ? raw.split(',') : []
        }
    }
    },
    {sequelize: sqlize, modelName:'user', tableName:'users', timestamps: true}
)

module.exports = User