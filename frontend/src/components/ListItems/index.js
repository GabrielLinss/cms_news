import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ClassIcon from '@material-ui/icons/Class';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PostAddIcon/>
      </ListItemIcon>
      <ListItemText primary="Novo post" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ClassIcon/>
      </ListItemIcon>
      <ListItemText primary="Categorias" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalOfferIcon/>
      </ListItemIcon>
      <ListItemText primary="Tags" />
    </ListItem>
  </div>
);
