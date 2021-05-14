import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Message from '../message/Message';

const Messages = ({ currentConversation, updateCurrentConversation }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messageDateTime, setMessageDateTime] = useState(new Date());
  const [filterValue, setFilterValue] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(currentConversation?.messages || '');

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

  const handleFilter = async (e) => {
    e.preventDefault();
    const filterMessage = filteredMessages.filter(msg => (
      msg.text.includes(filterValue)
    ));
    setFilteredMessages(filterMessage);
  }

  return (
    <>
      <div>Your current conversation: {currentConversation.title}</div>
      <div>
        <div>Messages:</div>
        {filteredMessages.map(message => (
          <div key={message.id}>
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
      <form onSubmit={handleFilter} style={{ marginBottom: '10px' }}>
        Filter messages by content:
        <input
          type="text"
          value={filterValue}
          onChange={e => setFilterValue(e.target.value)}
          required
        >
        </input>
        <button type="submit">
          Filter!
        </button>
      </form>
      <button onClick={() => updateCurrentConversation(false)}>
        Close conversation
      </button>
    </>
  );
};

export default Messages;