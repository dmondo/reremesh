const Thought = ({ thought }) => {
  return (
    <>
      {thought.text} -- {thought.time}
    </>
  );
};

export default Thought;