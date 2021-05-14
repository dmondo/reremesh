const Thought = require('../../models').Thought;

module.exports = {
  create(req, res) {
    return Thought
      .create({
        text: req.body.text,
        time: req.body.time,
        messageId: req.params.messageId
      })
      .then(thought => res.status(201).send(thought))
      .catch(error => res.status(400).send(error));
  },
};
