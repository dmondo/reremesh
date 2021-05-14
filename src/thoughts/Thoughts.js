import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Thought from '../thought/Thought';

const Thoughts = ({ currentMessage, setViewingThoughts, updateCurrentMessage}) => {
  const [newThought, setNewThought] = useState('');
  const [thoughtDateTime, setThoughtDateTime] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `/messages/${currentMessage.id}/thoughts`;
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ text: newThought, time: thoughtDateTime });
    const options = { method, headers, body };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(`data: ${JSON.stringify(data)}`)
    updateCurrentMessage(data[0]);
  };

  return (
    <>
      <div>
        {currentMessage.text}
      </div>
      <div>
        {currentMessage.thoughts.map((thought) => (
          <div>
            <Thought thought={thought} />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
        Leave a new thought:
        <input
          type="text"
          value={newThought}
          onChange={e => setNewThought(e.target.value)}
          required
        >
        </input>
        <DateTimePicker
          onChange={setThoughtDateTime}
          value={thoughtDateTime}
        />
        <button type="submit">
          Create!
        </button>
      </form>
      <div>
        <button onClick={() => setViewingThoughts(false)}>
          close thoughts
        </button>
      </div>
    </>
  );
};

export default Thoughts;