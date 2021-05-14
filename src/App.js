import { useState } from 'react';
import './App.css';
import Conversations from './conversations/Conversations';

const App = () => {
  const [conversationView, setConversationView] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Re-Remesh, the hot new competitor to Remesh.
        </p>
        {conversationView ? <Conversations /> : (
          <div onClick={() => setConversationView(!conversationView)}>
            View conversations
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
