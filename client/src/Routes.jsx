import { Register } from "./Register";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Routes = () => {

  const { username} = useContext(UserContext);

  if (username) {
    return 'Logged in!'
  }

  return (
   <Register/>
  )
}

export default Routes;