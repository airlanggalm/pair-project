'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Toy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Toy.hasMany(models.UserCart, {
        sourceKey: 'id',
        foreignKey: 'toyId'
      })
    }
  };
  Toy.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    color: DataTypes.STRING,
    company: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance, options) {
        if(instance.price > 0) {
          instance.price = `Rp. ${instance.price}`
        }
      }
    },
    sequelize,
    modelName: 'Toy',
  });
  return Toy;
};