const { DataTypes } = require('sequelize')
const sequelize = require('..')

const Url = sequelize.define('Url', {
  shortened: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  original: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Url
