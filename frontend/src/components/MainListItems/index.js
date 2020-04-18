import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ClassIcon from '@material-ui/icons/Class';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { useHistory } from 'react-router-dom';

export default function MainListItems() {
  const history = useHistory();

  return (
    <div>
      <ListItem button onClick={() => history.push('/dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => history.push('/dashboard/posts/new')}>
        <ListItemIcon>
          <PostAddIcon/>
        </ListItemIcon>
        <ListItemText primary="Novo post" />
      </ListItem>
      <ListItem button onClick={() => history.push('/dashboard/users')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItem>
      <ListItem button onClick={() => history.push('/dashboard/categories')}>
        <ListItemIcon>
          <ClassIcon/>
        </ListItemIcon>
        <ListItemText primary="Categorias" />
      </ListItem>
      <ListItem button onClick={() => history.push('/dashboard/tags')}>
        <ListItemIcon>
          <LocalOfferIcon/>
        </ListItemIcon>
        <ListItemText primary="Tags" />
      </ListItem>
    </div>
  );
}
