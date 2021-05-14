const Thought = require('../../models').Thought;
const Message = require('../../models').Message;

module.exports = {
  create(req, res) {
    return Thought
      .create({
        text: req.body.text,
        time: req.body.time,
        messageId: req.params.messageId
      })
      .then(() => {
        Message
          .findAll({
            where: {
              id: req.params.messageId,
            },
            include: [
              {
                model: Thought,
                as: 'thoughts',
              },
            ],
          })
          .then(message => res.status(201).send(message))
      })
      .catch(error => res.status(400).send(error));
  },
};
