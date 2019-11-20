import React, { Fragment, useState, createContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const UserContext = createContext();

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <UserContext.Consumer>
        {user => (
          <Fragment>
            <Navbar isAuthenticated={user.isAuthenticated} setIsAuthenticated={user.setIsAuthenticated}/>
            <Router>
              <Switch>
                <AuthRoute
                  path="/"
                  component={Home}
                  exact
                  isAuthenticated={user.isAuthenticated}
                />
                <Route
                  path="/login"
                  render={props => (
                    <Login
                      {...props}
                      isAuthenticated={user.isAuthenticated}
                      setIsAuthenticated={user.setIsAuthenticated}
                    />
                  )}
                />
              </Switch>
            </Router>
          </Fragment>
        )}
      </UserContext.Consumer>
    </UserContext.Provider>
  );
}

export default App;
