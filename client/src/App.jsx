import { Routes } from './Routes';
import axios from 'axios';
import {UserContextProvider } from './UserContext';

function App() {

  axios.defaults.baseURL = "http://localhost:4040";
  axios.defaults.withCredentials = true; // so we can set cookies from our api

  return (
    <UserContextProvider>
      <Routes/>
    </UserContextProvider>
  )
}

export default App
