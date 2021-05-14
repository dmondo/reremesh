const Message = require('../../models').Message;

module.exports = {
  create(req, res) {
    return Message
      .create({
        text: req.body.text,
        conversationId: req.params.conversationId
      })
      .then(message => res.status(201).send(message))
      .catch(error => res.status(400).send(error));
  },
};
