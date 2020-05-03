import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';
import Dashboard from '../../components/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  textArea: {
    minHeight: '20vh',
    minWidth: '62vw',
    borderRadius: 5,
    border: '1px solid #cecece',
    fontSize: 16
  }
}));

export default function EditPost(props) {
  const id = props.match.params.id;
  const [post, setPost] = useState({});

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    api.get(`/posts/${id}`).then(response => {
      setPost(response.data);
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await api.put(`/posts/${id}`, post, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Post editado com sucesso!');
      history.push('/dashboard');
    } catch (error) {
      alert('Erro ao editar post, tente novamente.');
    }
  }

  return (
    <Dashboard>
      <h1>Editar post - por {post.user && post.user.username}</h1>

      <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
        <TextField
          focused
          label="Título"
          id="title"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={post.title}
          onChange={e => setPost({ title: e.target.value})}
        />
        <TextField
          focused
          label="Subtítulo"
          id="subtitle"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={post.subtitle}
          onChange={e => setPost({ subtitle: e.target.value})}
        />
        <TextareaAutosize
          className={classes.textArea}
          aria-label="Content"
          placeholder="Conteúdo"
          value={post.content}
          onChange={e => setPost({ content: e.target.value})}
        />
        <Button type="submit" color="primary" size="large">Salvar</Button>
      </form>
    </Dashboard>
  );
}
