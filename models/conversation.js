module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    title: DataTypes.STRING,
    time: DataTypes.DATE,
  });

  Conversation.associate = (models) => {
    Conversation.hasMany(models.Message,  {
      foreignKey: 'conversationId',
      as: 'messages'
    });
  };

  return Conversation;
};
