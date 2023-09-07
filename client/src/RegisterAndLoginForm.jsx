import { useState, useContext } from "react";
import axios from 'axios';
import { UserContext } from "./UserContext";


export const RegisterAndLoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');

  const { setUsername: setLoggedInUsername, setId} = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault(); // to avoid data being sent to diff url, eg localhostblabla/?
    const url = isLoginOrRegister === 'register' ? 'register' : 'login';
    // whyyyyyyyyy does this not work when above should be string with slash so url should have slash
    const { data } = await axios.post(url, { username, password });
    setLoggedInUsername(username);
    setId(data.id);

  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
    <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
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
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === 'register' && (
            <div>
            Already a member?
             <button onClick={() => setIsLoginOrRegister("login")}>
              Login here
            </button>
           </div>
          )}
          {isLoginOrRegister === 'login' && (
               <div>
               Not a member?
                <button onClick={() => setIsLoginOrRegister("register")}>
                 Register here
               </button>
              </div>
          )}
        </div>
    
    </form>
  </div>
);
  
}

export default RegisterAndLoginForm;