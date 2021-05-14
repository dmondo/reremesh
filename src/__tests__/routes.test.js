const request = require('supertest');
const app = require('../../server');

describe('Conversations', () => {
  it('posts conversations', async () => {
    const currentTime = new Date();
    const res = await request(app)
      .post('/conversations')
      .send({
        title: 'my conversation',
        time: currentTime,
      });
    const conversation = res.body[res.body.length - 1];

    expect(res.statusCode).toEqual(201);
    expect(conversation.title).toEqual('my conversation');
    expect(JSON.stringify(conversation.time)).toEqual(JSON.stringify(currentTime));
  });

  it('gets conversations', async () => {
    const res = await request(app)
      .get('/conversations-summary');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('Messages', () => {
  it('posts messages', async () => {
    const currentTime = new Date();
    await request(app)
      .post('/conversations')
      .send({
        title: 'my conversation',
        time: currentTime,
      });

    const res = await request(app)
      .post('/conversations/1/messages')
      .send({
        text: 'my message',
        time: currentTime,
      });

  const conversation = res.body[res.body.length - 1];

    expect(res.statusCode).toEqual(201);
    expect(conversation.title).toEqual('my conversation');
    expect(conversation.messages[0].text).toEqual('my message');
  });

  it('gets messages associated to a conversation', async () => {
    const res = await request(app)
      .get('/conversations/1/messages');

    const conversation = res.body[res.body.length - 1];

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(conversation.messages.length).toBeGreaterThan(0);
  });
});

describe('Thoughts', () => {
  it('posts thoughts', async () => {
    const currentTime = new Date();
    await request(app)
      .post('/conversations')
      .send({
        title: 'my conversation',
        time: currentTime,
      });

    await request(app)
      .post('/conversations/1/messages')
      .send({
        text: 'my message',
        time: currentTime,
      });

    const res = await request(app)
      .post('/messages/1/thoughts')
      .send({
        text: 'my thought',
        time: currentTime,
      });

    expect(res.statusCode).toEqual(201)
  });

  it('gets thoughts associated to a message', async () => {
    const res = await request(app)
      .get('/messages/1/thoughts');

    const message = res.body[res.body.length - 1];

    expect(res.statusCode).toEqual(200);
    expect(message.text).toEqual('my message');
    expect(message.thoughts.length).toBeGreaterThan(0);
    expect(message.thoughts[0].text).toEqual('my thought');
  });
});
