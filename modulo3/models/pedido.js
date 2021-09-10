'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pedido.belongsTo(models.Cliente);
      Pedido.belongsTo(models.Servico);
    }
  };
  Pedido.init({
    dataPedido: DataTypes.DATEONLY,
    valorPedido: DataTypes.FLOAT,
    clienteId: DataTypes.INTEGER,
    servicoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};