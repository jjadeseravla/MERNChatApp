// import { useContext } from "react";
// import { UserContext } from "./UserContext";
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import { Routes } from './Routes';
// import { Routes } from './Routes';
// import { Register } from './Register';

function App() {

  axios.defaults.baseURL = "http://localhost:4040";
  axios.defaults.withCredentials = true; // so we can set cookies from our api

  // const { username} = useContext(UserContext);

  // if (username) {
  //   return 'Logged in!'
  // }

  return (
    // <div>
    //   <Route/>
    //   {/* <Routes/> */}
    //   <Register />
    // </div>
    <UserContextProvider>
      <Routes/>
     </UserContextProvider>
  )
}

export default App
