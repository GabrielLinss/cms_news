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
import moment from 'moment';

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
      const response = await api.get('/posts');

      let p1 = response.data.data.shift();
      p1 = {
        title: p1 && p1.title,
        description: p1 && p1.subtitle,
        image: p1 && p1.main_image,
        imgText: 'post image',
        linkText: 'Continue lendo…'
      };

      if (!p1) {
        p1 = {
          title: 'vazio',
          description: 'vazio',
          image: 'vazio',
          imgText: 'post image',
          linkText: 'Continue lendo…'
        };
      }

      let p2 = response.data.data.map(post => ({
        title: post && post.title,
        date: post && moment(post.createdAt).format('DD/MM/YYYY HH:mm'),
        description: post && post.subtitle,
        image: post && post.main_image,
        imageText: 'post image',
      }));

      if (p2.length === 0) {
        let pAux = {
          title: 'vazio',
          date: moment('2020-04-13T02:19:54.000Z').format('DD/MM/YYYY HH:mm'),
          description: 'vazio',
          image: 'vazio',
          imageText: 'post image'
        };
        p2.push(pAux);
      } else {
        p2 = [ p2[0], p2[1] ];
      }

      let p3 = response.data.data;

      setMainFeaturedPost(p1);
      setFeaturedPosts(p2);
      setPosts(p3);
    }

    loadCategories();
    loadPosts();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Serra Notícias" sections={categories} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="Mais recentes" posts={posts} />
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
