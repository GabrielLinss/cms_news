import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from '../Markdown';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
    borderBottom: '1px solid #cecece'
  },
  postImage: {
    maxWidth: '40vw',
    minWidth: '40vw',
    maxHeight: '50vh',
    minHeight: '50vh'
  }
}));

export default function Main(props) {
  const classes = useStyles();
  const { posts, title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
        <>
        <h4>Autor: {post.user.username}&nbsp;&nbsp;Data: {moment(post.createdAt).format('DD/MM/YYYY HH:mm')}&nbsp;&nbsp;Categoria: {post.category.name}</h4>
        <h4>Tags: {post.tags.map(tag => (`${tag.name} `))}</h4>
        <h1>{post.title}</h1>
        <img src={post.main_image} className={classes.postImage} alt=""/>
        <Markdown className={classes.markdown} key={post.id}>
          {post.content}
        </Markdown>
        </>
      ))}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
