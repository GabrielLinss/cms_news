import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Posts from './pages/Posts';
import EditPost from './pages/EditPost';
import NewPost from './pages/NewPost';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import Categories from './pages/Categories';
import Tags from './pages/Tags';
import Blog from './pages/Blog';
import Home from './pages/Home';
import Post from './pages/Post';

export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/home" exact component={Blog}/>
            <Route path="/home/categoria/:category" exact component={Blog}/>
            <Route path="/home/data/:year/:month" exact component={Blog}/>
            <Route path="/home/post/:postId/:postName" exact component={Post}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/dashboard" exact component={Posts}/>
            <Route path="/dashboard/posts/edit/:id" exact component={EditPost}/>
            <Route path="/dashboard/posts/new" exact component={NewPost}/>
            <Route path="/dashboard/users" exact component={Users}/>
            <Route path="/dashboard/users/edit/:id" exact component={EditUser}/>
            <Route path="/dashboard/categories" exact component={Categories}/>
            <Route path="/dashboard/tags" exact component={Tags}/>
        </Switch>
    </BrowserRouter>
  );
}
