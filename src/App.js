import React from "react";
import "./App.css";

import Login from "./Component/Login";
import Registration from "./Component/Registration";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./Component/config/firebase";

function App() {
  auth.onAuthStateChanged((user) => {
    if (user) {
    } else {
      alert("login faild");
    }
  });

  return (
    <Router>
      <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" component={Registration} />
      </Switch>
    </Router>
  );
}

export default App;
