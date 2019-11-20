import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <Router>
      <Switch>
        <AuthRoute path="/" component={Home} exact />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
