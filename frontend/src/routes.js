import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Posts from './pages/Posts';
import EditPost from './pages/EditPost';
import NewPost from './pages/NewPost';
import Users from './pages/Users';
import Categories from './pages/Categories';
import Tags from './pages/Tags';

export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/dashboard" exact component={Posts}/>
            <Route path="/dashboard/posts/edit/:id" exact component={EditPost}/>
            <Route path="/dashboard/posts/new" exact component={NewPost}/>
            <Route path="/dashboard/users" exact component={Users}/>
            <Route path="/dashboard/categories" exact component={Categories}/>
            <Route path="/dashboard/tags" exact component={Tags}/>
        </Switch>
    </BrowserRouter>
  );
}
