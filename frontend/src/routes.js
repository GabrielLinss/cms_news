import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EditPost from './pages/EditPost';

export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/posts/edit" exact component={EditPost}/>
        </Switch>
    </BrowserRouter>
  );
}
