import { useState, useEffect } from 'react';
import './App.css';
import Conversations from './conversations/Conversations';

const App = () => {
  const [conversationView, setConversationView] = useState(false);
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async () => {
    const response = await fetch('/conversations-summary');
    const data = await response.json();
    setConversations(data);
  }

  const updateConversations = (newConversation) => {
    setConversations([ ...conversations, newConversation ]);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Re-Remesh, the hot new competitor to Remesh.
        </p>
        {conversationView ? <Conversations conversations={conversations} updateConversations={updateConversations}/> : (
          <div onClick={() => setConversationView(!conversationView)}>
            View conversations
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
