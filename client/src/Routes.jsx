import { useContext } from "react";
import { UserContext } from "./UserContext";
import { RegisterAndLoginForm } from './RegisterAndLoginForm';

export const Routes = () => {

  const { username} = useContext(UserContext);

  if (username) {
    return `${username} is Logged in!`
  }

  return (
    <div>
      <RegisterAndLoginForm/>
    </div>
);
  
}

export default Routes;