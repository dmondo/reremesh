import { useState } from 'react';
import Thoughts from '../thoughts/Thoughts';

const Message = ({ message }) => {
  const [currentMessage, setCurrentMessage] = useState(null);
  const [viewingThoughts, setViewingThoughts] = useState(false);

  const updateCurrentMessage = (newMessage) => {
    setCurrentMessage(newMessage);
  };

  const fetchMessage = async (id) => {
    const url = `/messages/${id}/thoughts`;
    const response = await fetch(url);
    const data = await response.json();
    setCurrentMessage(data[0]);
  };

  return (
    <>
      <div>
        {viewingThoughts ? <Thoughts currentMessage={currentMessage} setViewingThoughts={setViewingThoughts} updateCurrentMessage={updateCurrentMessage} /> : (
          <div>
            {message.text} -- {message.time}
            <button onClick={async () => {
              await fetchMessage(message.id);
              setViewingThoughts(true);
            }}>
              see thoughts
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Message;