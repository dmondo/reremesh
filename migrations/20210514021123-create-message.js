module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      conversationId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Conversations',
          key: 'id',
          as: 'conversationId',
        },
      },
    }),
  down: (queryInterface) =>
    queryInterface.dropTable('Messages'),
};
