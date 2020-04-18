import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/Dashboard';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
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
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(false);
  const [tagId, setTagId] = useState(0);
  const [name, setName] = useState('');

  const classes = useStyles();

  useEffect(() => {
    api.get(`/tags`).then(response => {
      setTags(response.data);
    });
  }, []);

  async function handleDelete() {
    try {
      const token = localStorage.getItem('token');

      await api.delete(`tags/${tagId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTags(tags.filter(tag => tag.id !== tagId));
      setOpen(false);
    } catch (error) {
      alert('Erro ao deletar tag, tente novamente.');
    }
  }

  function openDialog(id) {
    setTagId(id);
    setOpen(true);
  }

  async function handleAdd(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await api.post(`tags`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setTags([ ...tags, response.data ]);
        setName('');
      });
    } catch (error) {
      alert('Erro ao adicionar tag, tente novamente.');
    }
  }

  return (
    <Dashboard>
      <Title>Tags</Title>
      <form onSubmit={handleAdd} className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Nome"
          id="name"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button type="submit" color="primary" size="large">Adicionar</Button>
      </form>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Data de criação</TableCell>
            <TableCell align="right">Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>{tag.name}</TableCell>
              <TableCell>{moment(tag.createdAt).format('DD/MM/YYYY HH:mm')}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => openDialog(tag.id)}>
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
              Tem certeza que deseja excluir esta tag?
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
