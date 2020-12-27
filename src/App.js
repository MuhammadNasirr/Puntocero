import React from "react";
import "./App.css";

import Login from "./Component/Login";
import Registration from "./Component/Registration";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./Component/config/firebase";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

function App() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      alert("login succesful")
    } else {
      alert("login faild");
    }
  });

  return (
    <Router>
      <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/registor_form" component={Registration} />
      </Switch>
    </Router>
  );
}

export default App;
