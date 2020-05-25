import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

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
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
)

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
            <PrivateRoute path="/dashboard" exact component={Posts}/>
            <PrivateRoute path="/dashboard/posts/edit/:id" exact component={EditPost}/>
            <PrivateRoute path="/dashboard/posts/new" exact component={NewPost}/>
            <PrivateRoute path="/dashboard/users" exact component={Users}/>
            <PrivateRoute path="/dashboard/users/edit/:id" exact component={EditUser}/>
            <PrivateRoute path="/dashboard/categories" exact component={Categories}/>
            <PrivateRoute path="/dashboard/tags" exact component={Tags}/>
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
  );
}
