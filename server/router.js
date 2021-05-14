const { Router } = require('express');
const conversations = require('./controllers').conversations;
const messages = require('./controllers').messages;

const router = Router();

router.get('/conversations-summary', conversations.summarize);

router.get('/conversations', conversations.list);
router.post('/conversations', conversations.create);

router.get('/conversations/:conversationId/messages', conversations.list);
router.post('/conversations/:conversationId/messages', messages.create);

module.exports = router;
