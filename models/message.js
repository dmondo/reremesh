module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: DataTypes.STRING
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Conversation, {
      foreignKey: 'conversationId',
      onDelete: 'CASCADE',
    });
  };

  return Message;
};
