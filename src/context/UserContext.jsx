import React, {createContext, useEffect, useState} from 'react'

    export const UserContext = createContext();

    export const UserProvider  = ({children}) => {
        const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

     useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);
    
  return (
        <UserContext.Provider value={{userId, setUserId}}> {children} </UserContext.Provider>
  )
}
    