import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Register } from './Register';

export const Routes = () => {

  const { username} = useContext(UserContext);

  if (username) {
    return 'Logged in!'
  }

  return (
    <div>
      <Register/>
    </div>
);
  
}

export default Routes;