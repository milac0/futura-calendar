import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from './components/Navbar';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Router>
      <Switch>
        <AuthRoute path="/" component={Home} exact />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
    </Fragment>

  );
}

export default App;
