import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: 'flex-start',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  header: {
    color: '#fff',
    backgroundImage: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,52,89,1) 0%, rgba(0,168,232,1) 90% )'
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  const history = useHistory();

  return (
    <>
      <header className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Button color="inherit" variant="outlined" size="small" onClick={() => history.push('/home')}>Início</Button>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            {title}
          </Typography>

          <Button color="inherit" variant="outlined" size="small" onClick={() => history.push('/login')}>
            Login
          </Button>
        </Toolbar>
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {sections.map((section) => (
            <Link
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              href={section.url}
              className={classes.toolbarLink}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </header>
    </>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
