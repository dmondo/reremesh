import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Messages from '../messages/Messages';

const Conversations = ({ conversations, updateConversations }) => {
  const [newConversation, setNewConversation] = useState('');
  const [currentConversation, setCurrentConversation] = useState(null);
  const [conversationDateTime, setConversationDateTime] = useState(new Date());
  const [filterValue, setFilterValue] = useState('');
  const [filteredConversations, setFilteredConversations] = useState(conversations);

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
    const body = JSON.stringify({ title: newConversation, time: conversationDateTime });
    const options = { method, headers, body };
    const response = await fetch(url, options);
    const data = await response.json();
    updateConversations(data);
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    const filterConversation = filteredConversations.filter(convo => (
      convo.title.includes(filterValue)
    ));
    setFilteredConversations(filterConversation);
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
        Start a new conversation:
        <input
          type="text"
          value={newConversation}
          onChange={e => setNewConversation(e.target.value)}
          required
        >
        </input>
        <DateTimePicker
          onChange={setConversationDateTime}
          value={conversationDateTime}
        />
        <button type="submit">
          Create!
        </button>
      </form>
      <form onSubmit={handleFilter} style={{ marginBottom: '10px' }}>
        Filter conversations by title:
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
      {currentConversation ? <Messages currentConversation={currentConversation} updateCurrentConversation={updateCurrentConversation} /> : (
        filteredConversations.map(conversation => (
          <div key={conversation.id}>
            <div>{conversation.title} -- {conversation.time}</div>
            <button onClick={() => fetchConversation(conversation.id)}>View messages.</button>
          </div>
        )))
      }
    </>
  );
};

export default Conversations;
