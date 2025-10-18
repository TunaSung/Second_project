const { Model, DataTypes } = require('sequelize')
const sqlize = require('../config/database')

class Event extends Model{}

Event.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING, allowNull: false},
        description: {type:DataTypes.STRING},
        imageUrl: {type: DataTypes.STRING},
        address: {type: DataTypes.STRING, allowNull: false},
        startDate: {type: DataTypes.DATE, allowNull: false},
        endDate: {type: DataTypes.DATE, allowNull: false},
    },
    {sequelize: sqlize, modelName:'event', tableName:'events'}
)


Event.sync();

module.exports = Event;