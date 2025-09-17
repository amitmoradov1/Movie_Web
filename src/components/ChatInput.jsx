import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-input">
      <input 
        type="text" 
        placeholder="כתבו הודעה..." 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSend}>שלח</button>
    </div>
  );
};

export default ChatInput;