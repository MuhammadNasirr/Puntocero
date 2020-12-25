import React from "react";
import "./App.css";

import Login from "./Component/Login";
import Registration from "./Component/Registration";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./Component/config/firebase";

function App() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      alert("you logged succesfully");
    } else {
      alert("login faild");
    }
  });

  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/registor_form" component={Registration} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
