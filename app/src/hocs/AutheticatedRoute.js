import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

//we dont want a logged in user to be able to log in or register

const AutheticatedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;

        return <Component {...props} />;
      }}
    />
  );
};

export default AutheticatedRoute;
