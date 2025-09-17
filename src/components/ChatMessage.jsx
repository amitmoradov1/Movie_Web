import React from 'react';

const ChatMessage = ({ message, type }) => {
  return (
    <div className={`message ${type}`}>
      {message}
    </div>
  );
};

export default ChatMessage;