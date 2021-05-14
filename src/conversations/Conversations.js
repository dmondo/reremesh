import { useState } from 'react';
import Messages from '../messages/Messages';

const Conversations = ({ conversations, updateConversations }) => {
  const [newConversation, setNewConversation] = useState('');
  const [currentConversation, setCurrentConversation] = useState(null);

  const updateCurrentConversation = (conversation) => {
    setCurrentConversation(conversation);
  };

  const fetchConversation = async (id) => {
    const url = `/conversations/${id}/messages`;
    const response = await fetch(url);
    const data = await response.json();
    setCurrentConversation(data[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = '/conversations';
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ title: newConversation });
    const options = { method, headers, body };
    const response = await fetch(url, options);
    const data = await response.json();
    updateConversations(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
        What's your conversation called?
        <input
          type="text"
          value={newConversation}
          onChange={e => setNewConversation(e.target.value)}
          required
        >
        </input>
        <button type="submit">
          Create!
        </button>
      </form>
      {currentConversation ? <Messages currentConversation={currentConversation} updateCurrentConversation={updateCurrentConversation} /> : (
        conversations.map(conversation => (
          <div>
            <div key={conversation.id}>{conversation.title}</div>
            <button onClick={() => fetchConversation(conversation.id)}>View messages.</button>
          </div>
        )))
      }
    </>
  );
};

export default Conversations;
