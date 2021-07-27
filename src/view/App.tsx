import React from 'react';
import { FluidPage, Home, Login } from './pages';
import { FILEPATH } from '../config';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GithubContext } from '../utils/githubContext';

const App = () => {
  const user = localStorage.getItem('githubUser');
  const userLabel = user ? JSON.parse(user).login : 'Please login';
  const [isLoggedIn, setIsLoggedIn] = React.useState(user !== null);
  if (!isLoggedIn) {
    return (
    <Router>
      <Login setIsLoggedIn={setIsLoggedIn} />
    </Router>);
  }
  return (
    <GithubContext>
      <Router>
        <label>{`Current User: ${userLabel}`}</label>
        <Switch>
          <Route path={`/${FILEPATH}/:id`}>
            <FluidPage />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>
        </Switch>
      </Router>
    </GithubContext>
  );
};

export default App;
