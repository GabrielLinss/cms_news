import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Title from '../../components/Title';
import api from '../../services/api';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dashboard from '../../components/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [suggestPassword, setSuggestPassword] = useState(generateRandomPassword());

  const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    const token = getToken();

    api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setUsers(response.data);
    });
  }, []);

  async function handleDelete() {
    try {
      const token = getToken();

      await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(users.filter(user => user.id !== userId));
      setOpen(false);
    } catch (error) {
      alert('Erro ao deletar usuário, tente novamente.');
    }
  }

  function handleEdit(id) {
    history.push(`/dashboard/users/edit/${id}`);
  }

  function openDialog(id) {
    setUserId(id);
    setOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let user = {
        username,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role_id: 1
      };

      const response = await api.post('/register', user);

      setUsername('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      setSuggestPassword(generateRandomPassword());

      setUsers([ ...users, response.data.user ]);
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar usuário, tente novamente.');
    }
  }

  function generateRandomPassword() {
    return Math.random().toString(36).slice(-8);
  }

  return (
    <Dashboard>
      <Title>Novo usuário</Title>

      <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Nome"
          id="username"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          id="email"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          id="password"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          label="Confirmar senha"
          id="passwordConfirmation"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
        />

        <TextField
          label="Sugestão de senha"
          id="suggestPassword"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={suggestPassword}
          onChange={() => {}}
          disabled
        />

        <Button type="submit" color="primary" size="large">Cadastrar</Button>
      </form>

      <Title>Usuários - total: {users.length}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Nível</TableCell>
            <TableCell>Data de criação</TableCell>
            <TableCell align="right">Editar</TableCell>
            <TableCell align="right">Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role && user.role.type}</TableCell>
              <TableCell>{moment(user.createdAt).format('DD/MM/YYYY HH:mm')}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => handleEdit(user.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => openDialog(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmação</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja excluir este usuário?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Não
            </Button>
            <Button onClick={() => handleDelete()} color="primary" autoFocus>
              Sim
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Dashboard>
  );
}
