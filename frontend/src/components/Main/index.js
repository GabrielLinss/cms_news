import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../services/api';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
    borderBottom: '1px solid #cecece'
  },
  postImage: {
    maxWidth: '100%',
    maxHeight: '50vh',
  },
  seeMore: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

export default function Main(props) {
  const posts = useSelector(state => state);

  const classes = useStyles();

  const { title } = props;

  const dispatch = useDispatch();

  async function handlePage(page) {
    const response = await api.get(`/posts?page=${page}`);

    dispatch({ type: 'LOAD_POSTS', posts: response.data.data, page: response.data.page, lastPage: response.data.lastPage });
  }

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.data.map((post) => (
        <div key={post.id}>
          <h4>
            Por: {post.user.username}&nbsp;&nbsp;
            Data: {moment(post.createdAt).format('DD/MM/YYYY HH:mm')}&nbsp;&nbsp;
            Categoria: {post.category.name}&nbsp;&nbsp;
            Tags: {post.tags.map(tag => (`${tag.name} `))}
          </h4>
          <h1>{post.title}</h1>
          <img src={post.main_image} className={classes.postImage} alt=""/>
          <div className={classes.markdown} id="content">
            { ReactHtmlParser(post.content) }
          </div>
        </div>
      ))}

      <div className={classes.seeMore}>
        <Pagination
          count={posts.lastPage}
          page={posts.page}
          onChange={(event, page) => handlePage(page)}
        />
      </div>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
