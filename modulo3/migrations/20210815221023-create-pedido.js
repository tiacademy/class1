'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataPedido: {
        type: Sequelize.DATEONLY
      },
      valorPedido: {
        type: Sequelize.FLOAT
      },
      clienteId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'clientes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        ondUpdate: 'CASCADE',
        allowNull: false,
      },
      servicoId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'servicos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        ondUpdate: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedidos');
  }
};