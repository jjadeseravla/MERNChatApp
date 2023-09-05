import { createContext, useState } from 'react';

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  return (
    <UserContextProvider value={{username, setUsername, id, setId}}>
      {children}
    </UserContextProvider>
  )
}