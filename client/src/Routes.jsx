import { useContext } from "react";
import { UserContext } from "./UserContext";
import { RegisterAndLoginForm } from './RegisterAndLoginForm';
import { Chat } from './Chat';

export const Routes = () => {

  const { username} = useContext(UserContext);

  if (username) {
    return (
      <div className="p-3">
        {username} is Logged in!
        <Chat/>
      </div>
    ) 
  }

  return (
    <div>
      <RegisterAndLoginForm/>
    </div>
);
  
}

export default Routes;