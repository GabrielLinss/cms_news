import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import Dashboard from '../../components/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getToken } from '../../services/auth';

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
  const [post, setPost] = useState(null);

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    async function loadPost() {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    }
    loadPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = getToken();

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
      <h1>Editar post</h1>

      <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
        <TextField
          focused
          label="Título"
          id="title"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={post && post.title}
          onChange={e => setPost({ title: e.target.value})}
        />
        <TextField
          focused
          label="Subtítulo"
          id="subtitle"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={post && post.subtitle}
          onChange={e => setPost({ subtitle: e.target.value})}
        />
        <CKEditor
          editor={ ClassicEditor }
          data={post && post.content}
          onInit={ editor => {
            console.log( 'Editor is ready to use!', editor );
          }}
          onChange={ ( event, editor ) => {
            const data = editor.getData();
            setPost({ content: data });
          }}
        />
        <Button type="submit" color="primary" size="large">Salvar</Button>
      </form>
    </Dashboard>
  );
}
