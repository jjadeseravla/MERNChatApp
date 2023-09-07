import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);


  useEffect(() => {
    axios.get('/profile').then(response => {
      setId(response.data.userId);
      setUsername(response.data.username);
    });
  }, []);
  // useEffect(() => {
  //   // Define an async function inside the useEffect callback
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/profile', {withCredentials: true});
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error('Error fetching profile data:', error);
  //     }
  //   };
  
  //   // Call the async function
  //   fetchData();
  // }, []);
  
  

  return (
    <UserContext.Provider value={{username, setUsername, id, setId}}>
      {children}
    </UserContext.Provider>
  )
}