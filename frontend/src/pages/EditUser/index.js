import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import Dashboard from '../../components/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
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
  }
}));

export default function EditUser(props) {
  const id = props.match.params.id;
  const [user, setUser] = useState({});

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    api.get(`/users/${id}`).then(response => {
      setUser(response.data);
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = getToken();

      await api.put(`/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Usuário editado com sucesso!');
      history.push('/dashboard/users');
    } catch (error) {
      alert('Erro ao editar usuário, tente novamente.');
    }
  }

  return (
    <Dashboard>
      <h1>Editar usuário</h1>

      <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Nome"
          id="username"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={user.username}
          focused
          onChange={e => setUser({ username: e.target.value})}
        />
        <Button type="submit" color="primary" size="large">Salvar</Button>
      </form>
    </Dashboard>
  );
}
