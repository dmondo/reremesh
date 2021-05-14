const { Router } = require('express');
const conversations = require('./controllers').conversations;
const messages = require('./controllers').messages;
const thoughts = require('./controllers').thoughts;

const router = Router();

router.get('/conversations-summary', conversations.summarize);
router.post('/conversations', conversations.create);

router.get('/conversations/:conversationId/messages', conversations.list);
router.post('/conversations/:conversationId/messages', messages.create);

router.get('/messages/:messageId/thoughts', messages.list);
router.post('/messages/:messageId/thoughts', thoughts.create);

module.exports = router;
