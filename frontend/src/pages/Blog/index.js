import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Header from '../../components/Header';
import MainFeaturedPost from '../../components/MainFeaturedPost';
import FeaturedPost from '../../components/FeaturedPost';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import api from '../../services/api';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
}));

const actualYear = new Date().getFullYear();
const archivesURL = 'http://localhost:3000/home/data/';

const sidebar = {
  title: 'Anúncio aqui',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: `Dezembro ${actualYear}`, url: `${archivesURL}${actualYear}/dezembro` },
    { title: `Novembro ${actualYear}`, url: `${archivesURL}${actualYear}/novembro` },
    { title: `Outubro ${actualYear}`, url: `${archivesURL}${actualYear}/outubro` },
    { title: `Setembro ${actualYear}`, url: `${archivesURL}${actualYear}/setembro` },
    { title: `Agosto ${actualYear}`, url: `${archivesURL}${actualYear}/agosto` },
    { title: `Julho ${actualYear}`, url: `${archivesURL}${actualYear}/julho` },
    { title: `Junho ${actualYear}`, url: `${archivesURL}${actualYear}/junho` },
    { title: `Maio ${actualYear}`, url: `${archivesURL}${actualYear}/maio` },
    { title: `Abril ${actualYear}`, url: `${archivesURL}${actualYear}/abril` },
    { title: `Março ${actualYear}`, url: `${archivesURL}${actualYear}/marco` },
    { title: `Fevereiro ${actualYear}`, url: `${archivesURL}${actualYear}/fevereiro` },
    { title: `Janeiro ${actualYear}`, url: `${archivesURL}${actualYear}/janeiro` }
  ],
  social: [
    { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com' },
    { name: 'Facebook', icon: FacebookIcon, url: 'https://www.facebook.com' }
  ],
};

export default function Blog(props) {
  const categoryId = props.match.params.category;
  const month = props.match.params.month;
  const classes = useStyles();

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [mainFeaturedPost, setMainFeaturedPost] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('/categories');
      const data = response.data.map(category => ({ title: category.name, url: `http://localhost:3000/home/categoria=${category.id}` }));
      setCategories(data);
    }

    async function loadPosts() {
      let response

      if (categoryId) {
        const paramToArray = categoryId.split('=');
        response = await api.get(`/posts?category_id=${paramToArray[1]}`);
      }
      else if (month) {
        response = await api.get(`/postsByMonth?month=${month}`);
      }
      else response = await api.get('/posts');

      setMainFeaturedPost(response.data.data[0]);
      setFeaturedPosts([ response.data.data[1], response.data.data[2] ]);
      response.data.data.splice(0, 3);
      dispatch({ type: 'LOAD_POSTS', posts: response.data.data });
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
            <Main title="Veja mais" />
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
