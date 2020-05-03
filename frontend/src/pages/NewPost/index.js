import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Input, Select, MenuItem } from '@material-ui/core';
import Dashboard from '../../components/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import CKEditor from 'ckeditor4-react';

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

export default function NewPost() {
  const [category, setCategory] = useState(1);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('<p>Adicione o conteúdo aqui</p>');
  const [mainImage, setMainImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState('');

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    api.get('/categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const user_id = localStorage.getItem('userId');

      let data = new FormData();
      data.append('user_id', user_id);
      data.append('category_id', category);
      data.append('title', title);
      data.append('subtitle', subtitle);
      data.append('content', content);
      data.append('tags', tags);
      data.append('main_image', mainImage);

      await api.post('posts', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setCategory(1);
      setTitle('');
      setSubtitle('');
      setContent('');
      setTags('');
      setMainImage(null);

      alert('Post cadastrado com sucesso!');
      history.push('/dashboard');
    } catch (error) {
      alert('Erro ao cadastrar post, tente novamente.');
    }
  }

  return (
    <Dashboard>
      <h1>Novo post</h1>

      <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Título"
          id="title"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          label="Subtítulo"
          id="subtitle"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
        />
        <TextField
          label="Tags"
          id="tags"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <Select
          id="category"
          className={classes.textField}
          value={category}
          margin="dense"
          variant="outlined"
          onChange={e => setCategory(e.target.value)}
          label="Categoria"
        >
          {categories.map(cat => {
            if (cat.id === 1) return <MenuItem key={cat.id} value={cat.id} selected>{cat.name}</MenuItem>;
            else return <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>;
          })}
        </Select>
        <Input
          type="file"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          onChange={e => setMainImage(e.target.files[0])}
        />

        <CKEditor
          data={content}
          onChange={e => setContent(e.editor.getData())}
        />

        <Button type="submit" color="primary" size="large">Postar</Button>
      </form>
    </Dashboard>
  );
}
