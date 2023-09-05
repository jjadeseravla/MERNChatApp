// import { useState } from 'react'
import './App.css'
import { Register } from './Register';
import axios from 'axios';

function App() {

  axios.defaults.baseURL = "http://localhost:4040";
  axios.defaults.withCredentials = true; // so we can set cookies from our api

  return (
    <div className="bg-red-500">
      <Register/>
    </div>
  )
}

export default App
