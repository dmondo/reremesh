module.exports = (sequelize, DataTypes) => {
  const Thought = sequelize.define('Thought', {
    text: DataTypes.STRING,
    time: DataTypes.DATE,
  });

  Thought.associate = (models) => {
    Thought.belongsTo(models.Message, {
      foreignKey: 'messageId',
      onDelete: 'CASCADE',
    });
  };

  return Thought;
};