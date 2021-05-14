module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Thoughts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      messageId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Messages',
          key: 'id',
          as: 'messageId',
        },
      },
    }),
  down: (queryInterface) =>
    queryInterface.dropTable('Thoughts'),
};