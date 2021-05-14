module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    title: DataTypes.STRING
  });

  Conversation.associate = (models) => {
    Conversation.hasMany(models.Message,  {
      foreignKey: 'conversationId',
      as: 'messages'
    });
  };

  return Conversation;
};
