import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./login/Login";
import Register from "./register/Register";
import Blog from "./blog/Blog";
import * as serviceWorker from "./serviceWorker";
import { ProtectedRoute } from "./helper/protectedRoute";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/**
 * Index
 * @author Lara Akgün
 * @author Enma Ronquillo
 * @version 08.11.2019
 */
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/blog" component={Blog} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
serviceWorker.unregister();
