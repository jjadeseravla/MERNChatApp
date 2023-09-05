import { useState, useContext } from "react";
import axios from 'axios';
import { UserContext } from "./UserContext";


export const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUsername: setLoggedInUsername, setId} = useContext(UserContext);

  const register = async (e) => {
    e.preventDefault(); // to avoid data being sent to diff url, eg localhostblabla/?
    const { data } = await axios.post('/register', { username, password });
    setLoggedInUsername(username);
    setId(data.id);

  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
    <form className="w-64 mx-auto mb-12" onSubmit={register}>
      <input value={username}
             onChange={ev => setUsername(ev.target.value)}
             type="text" placeholder="username"
             className="block w-full rounded-sm p-2 mb-2 border" />
      <input value={password}
             onChange={ev => setPassword(ev.target.value)}
             type="password"
             placeholder="password"
             className="block w-full rounded-sm p-2 mb-2 border" />
      <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {/* {isLoginOrRegister === 'register' ? 'Register' : 'Login'} */}
          Register
      </button>
    
    </form>
  </div>
);
  
}

export default Register;