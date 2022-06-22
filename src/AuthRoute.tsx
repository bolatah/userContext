import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext";

export interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<IAuthRouteProps> = (props) => {
  const userContext = useContext(UserContext);

  const { user, accessToken } = userContext.userState;
  const { children } = props;
  console.log(user);
  if (accessToken === "accessToken") {
    return <>{children}</>;
  } else {
    return (
      <Navigate
        to="/errorHandling
    "
      />
    );
  }
};

export default AuthRoute;
