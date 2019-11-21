import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { getLocalStorageToken, checkAccessTokenExp } from "./util/funcs";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      token: ""
    };
  }

  componentDidMount = async () => {
      const accessToken = getLocalStorageToken();
      if (accessToken) {
        if (await checkAccessTokenExp(accessToken)) {
          this.setState({ isAuthenticated: true, token: accessToken });
        }
      }
  };

  handleAuthentication = bool => {
    this.setState({ isAuthenticated: bool });
  };

  getTokenFromLogin = token => {
    localStorage.setItem("calendarToken", JSON.stringify(token));
    this.setState({ token, isAuthenticated: true });
  };

  render() {
    const { isAuthenticated } = this.state;
    return (
      <Fragment>
        <Navbar
          isAuthenticated={isAuthenticated}
          handleAuthentication={this.handleAuthentication}
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
                  getTokenFromLogin={this.getTokenFromLogin}
                />
              )}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
