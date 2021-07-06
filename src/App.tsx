import React from "react";
import TLC from "@fluid-experimental/tinylicious-client";
import "./App.css";
import { FluidPage, Home } from "./pages";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

TLC.init();

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/fluid/:id">
          <FluidPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
