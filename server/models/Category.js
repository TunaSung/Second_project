const { Model, DataTypes } = require('sequelize')
const sqlize = require('../config/database')

class Catogory extends Model{}

Catogory.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false},
    parentId: {type: DataTypes.INTEGER, references: {model: 'categories', key: 'id'}},
    img: {type: DataTypes.STRING}
    },
    {sequelize: sqlize, modelName:'catogory', tableName:'categories', timestamps: false}
)

module.exports = Catogory