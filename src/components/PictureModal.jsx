import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import useWebSocket from '../hooks/useWebSocket';

const PictureModal = ({ picture, onClose }) => {
  const [messages, setMessages] = useState([]);
  const socket = useWebSocket();

  useEffect(() => {
    if (picture) {
      setMessages([
        { type: 'other', text: `ברוכים הבאים לדיון על התמונה "${picture.name}"!` }
      ]);
    }
  }, [picture]);

  const handleSendMessage = (message) => {
    setMessages(prev => [...prev, { type: 'user', text: message }]);
    if (socket) {
      socket.send(message, (response) => {
        setMessages(prev => [...prev, { type: 'other', text: response }]);
      });
    }
  };

  const handleClose = () => {
    setMessages([]);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (picture) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
      };
 }, [picture]);

 if (!picture) return null;

 return (
   <div className="picture-view" onClick={handleBackdropClick}>
     <button className="close-btn" onClick={handleClose}>✕</button>
     <div className="picture-view-content">
       <div className="picture-main">
         <div className="picture-large">
           <div className="picture-title">{picture.name}</div>
         </div>
       </div>
       <div className="chat-sidebar">
         <div className="chat-header">
           <div className="picture-info">
             <h2>{picture.name}</h2>
             <div className="info-item">
               <span className="info-label">אמן:</span>
               <span>{picture.artist}</span>
             </div>
             <div className="info-item">
               <span className="info-label">רזולוציה:</span>
               <span>{picture.resolution}</span>
             </div>
             <div className="info-item">
               <span className="info-label">גודל:</span>
               <span>{picture.size}</span>
             </div>
             <div className="info-item">
               <span className="info-label">פורמט:</span>
               <span>{picture.format}</span>
             </div>
           </div>
         </div>
         <div className="chat-messages">
           {messages.map((msg, index) => (
             <ChatMessage key={index} message={msg.text} type={msg.type} />
           ))}
         </div>
         <ChatInput onSendMessage={handleSendMessage} />
       </div>
     </div>
   </div>
 );
};

export default PictureModal;