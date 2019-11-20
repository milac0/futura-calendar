import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { getLocalStorageToken, checkAccessTokenExp } from "./util/funcs";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkToken = async () => {
      const token = getLocalStorageToken();
      if (token) {
        setIsAuthenticated(await checkAccessTokenExp(token));
      }
    };
    checkToken();
  });

  return (
    <Fragment>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Router>
        <Switch>
          <AuthRoute
            path="/"
            component={Home}
            exact
            isAuthenticated={isAuthenticated}
          />
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            )}
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
