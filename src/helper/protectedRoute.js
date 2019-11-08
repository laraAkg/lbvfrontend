import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./authentication";

/**
 * Handles the authorisation by protected router
 * Redirects the user from Blog to Login if user is unauthorised
 * @author Lara Akgün
 * @author Enma Ronquillo
 * @version 08.11.2019
 */
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        console.info(auth.isAuthenticated());
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
