import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from '../../components/Header';
import MainFeaturedPost from '../../components/MainFeaturedPost';
import FeaturedPost from '../../components/FeaturedPost';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
}));

const sidebar = {
  title: 'Anúncio aqui',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'Maio 2020', url: '#' },
    { title: 'Abril 2020', url: '#' },
    { title: 'Março 2020', url: '#' },
    { title: 'Fevereiro 2020', url: '#' },
    { title: 'Janeiro 2020', url: '#' },
    { title: 'Dezembro 2019', url: '#' },
    { title: 'Novembro 2019', url: '#' },
    { title: 'Outubro 2019', url: '#' },
    { title: 'Setembro 2019', url: '#' },
    { title: 'Agosto 2019', url: '#' },
    { title: 'Julho 2019', url: '#' }
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon, url: 'https://www.github.com/GabrielLinss' },
    { name: 'Twitter', icon: TwitterIcon, url: 'https://twitter.com' },
    { name: 'Facebook', icon: FacebookIcon, url: 'https://www.facebook.com' }
  ],
};

export default function Blog(props) {
  const categoryId = props.match.params.category;
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const [mainFeaturedPost, setMainFeaturedPost] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('/categories');
      const data = response.data.map(category => ({ title: category.name, url: `http://localhost:3000/home/${category.id}` }));
      setCategories(data);
    }

    async function loadPosts() {
      let response

      if (categoryId) response = await api.get(`/posts?category_id=${categoryId}`);
      else response = await api.get('/posts');

      setMainFeaturedPost(response.data.data[0]);
      setFeaturedPosts([ response.data.data[1], response.data.data[2] ]);
      response.data.data.splice(0, 3);
      setPosts(response.data.data);
    }

    loadCategories();
    loadPosts();
  }, [categoryId]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Serra Notícias" sections={categories} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post && post.id} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="Veja mais" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Sobre" description="As últimas notícias na palma da sua mão!" />
    </>
  );
}
