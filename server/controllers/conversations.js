const Conversation = require('../../models').Conversation;
const Message = require('../../models').Message;
const Thought = require('../../models').Thought;

module.exports = {
  create(req, res) {
    return Conversation
      .create({
        title: req.body.title,
        time: req.body.time,
      })
      .then(() => {
        Conversation
          .findAll({})
          .then(conversations => res.status(201).send(conversations))
      })
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Conversation
      .findAll({
        where: {
          id: req.params.conversationId,
        },
        include: [
          {
            model: Message,
            as: 'messages',
          },
        ],
      })
      .then(conversations => res.status(200).send(conversations))
      .catch(error => res.status(400).send(error));
  },
  summarize(req, res) {
    return Conversation
      .findAll({})
      .then(conversations => res.status(200).send(conversations))
      .catch(error => res.status(400).send(error));
  }
};
