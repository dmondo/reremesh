module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: DataTypes.STRING,
    time: DataTypes.DATE,
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Conversation, {
      foreignKey: 'conversationId',
      onDelete: 'CASCADE',
    });

    Message.hasMany(models.Thought,  {
      foreignKey: 'messageId',
      as: 'thoughts'
    });
  };

  return Message;
};
