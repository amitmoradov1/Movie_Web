import { useState, useEffect } from 'react';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const mockSocket = {
      send: (message, callback) => {
        setTimeout(() => {
          if (callback) {
            callback(`תגובה אוטומטית: ${message}`);
          }
        }, 1000);
      }
    };
    
    setSocket(mockSocket);
  }, []);

  return socket;
};

export default useWebSocket;