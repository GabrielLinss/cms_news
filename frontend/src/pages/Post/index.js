import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import api from '../../services/api';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
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
  mainGrid: {
    marginTop: theme.spacing(0),
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

export default function Post(props) {
  const postId = props.match.params.postId;
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('/categories');
      const data = response.data.map(category => ({ title: category.name, url: `http://localhost:3000/home/categoria/${category.name}` }));
      setCategories(data);
    }

    async function loadPost() {
      const response = await api.get(`/posts/${postId}`);

      setPost(response.data);
    }

    loadCategories();
    loadPost();
  }, [postId]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Serra Notícias" sections={categories} />
        <main>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} md={8}>
              <h1>{post && post.title}</h1>
              <div>
                <h4>
                  Por: { post && post.user.username}&nbsp;&nbsp;
                  Data: {post && moment(post.createdAt).format('DD/MM/YYYY HH:mm')}&nbsp;&nbsp;
                  Categoria: {post && post.category.name}&nbsp;&nbsp;
                  Tags: {post && post.tags.map(tag => (`${tag.name} `))}
                </h4>
                <img src={post && post.main_image} className={classes.postImage} alt="" />
                <h3>{post && post.subtitle}</h3>
                <div className={classes.markdown} id="content">
                  {ReactHtmlParser(post && post.content)}
                </div>
              </div>
            </Grid>
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
