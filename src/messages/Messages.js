import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Message from '../message/Message';

const Messages = ({ currentConversation, updateCurrentConversation }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messageDateTime, setMessageDateTime] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `/conversations/${currentConversation.id}/messages`;
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ text: newMessage, time: messageDateTime });
    const options = { method, headers, body };
    const response = await fetch(url, options);
    const data = await response.json();
    updateCurrentConversation(data[0]);
  };

  return (
    <>
      <div>Your current conversation: {currentConversation.title}</div>
      <div>
        <div>Messages:</div>
        {currentConversation.messages.map(message => (
          <div>
            <Message message={message} />
          </div>
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
        <DateTimePicker
          onChange={setMessageDateTime}
          value={messageDateTime}
        />
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