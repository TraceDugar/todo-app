import { useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import { When } from 'react-if';

// Authorization Logic which is passed down to children
const Auth = ({ capability, children }) => {
  const { can, isLoggedIn } = useContext(AuthContext);
  return (
    <When condition={isLoggedIn && can(capability)}>
      {children}
    </When>
  )
};

export default Auth;
