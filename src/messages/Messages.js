import Message from '../message/Message';

const Messages = ({ currentConversation, updateCurrentConversation }) => {
  return (
    <>
      <div>Your current conversation: {currentConversation.title}</div>
      <div>
        <div>Messages:</div>
        {currentConversation.messages.map(message => (
          <Message message={message} />
        ))}
      </div>
      <button onClick={() => updateCurrentConversation(false)}>
        Close conversation
      </button>
    </>
  );
};

export default Messages;