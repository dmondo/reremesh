const Conversation = require('../../models').Conversation;
const Message = require('../../models').Message;
const Thought = require('../../models').Thought;

module.exports = {
  create(req, res) {
    return Message
      .create({
        text: req.body.text,
        time: req.body.time,
        conversationId: req.params.conversationId
      })
      .then(() => {
        Conversation
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
          .then(conversation => res.status(201).send(conversation))
      })
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Message
      .findAll({
        where: {
          id: req.params.messageId,
        },
        include: [{
          model: Thought,
          as: 'thoughts',
        }],
      })
      .then(messages => res.status(200).send(messages))
      .catch(error => res.status(400).send(error));
  },
};
