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
    creditCard: {type: DataTypes.STRING, unique: true},
    avatarUrl:{type: DataTypes.STRING}
    },
    {sequelize: sqlize, modelName:'user', tableName:'users', timestamps: true}
)

module.exports = User