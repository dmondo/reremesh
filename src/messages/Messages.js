import { useState } from 'react';
import Message from '../message/Message';

const Messages = ({ currentConversation, updateCurrentConversation }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `/conversations/${currentConversation.id}/messages`;
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ text: newMessage, time: new Date() });
    const options = { method, headers, body };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(`data: ${JSON.stringify(data)}`);
    updateCurrentConversation(data[0]);
    // updateMessages(currentConversation.id, data);
  };

  return (
    <>
      <div>Your current conversation: {currentConversation.title}</div>
      <div>
        <div>Messages:</div>
        {currentConversation.messages.map(message => (
          <Message message={message} />
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
        Leave a new message:
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          required
        >
        </input>
        <button type="submit">
          Create!
        </button>
      </form>
      <button onClick={() => updateCurrentConversation(false)}>
        Close conversation
      </button>
    </>
  );
};

export default Messages;