import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dashboard from '../../components/Dashboard';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(0);

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    api.get(`/posts?page=${page}`).then(response => {
      setPosts(response.data.data);
      setTotal(response.data.total);
      setLastPage(response.data.lastPage);
    });
  }, [page]);

  async function handleDelete() {
    try {
      const token = localStorage.getItem('token');

      await api.delete(`posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPosts(posts.filter(post => post.id !== postId));
      setTotal(total - 1);
      setOpen(false);
    } catch (error) {
      alert('Erro ao deletar post, tente novamente.');
    }
  }

  function handleEdit(id) {
    history.push(`/dashboard/posts/edit/${id}`);
  }

  function openDialog(id) {
    setPostId(id);
    setOpen(true);
  }

  return (
    <Dashboard>
      <Title>Posts - total: {total}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Criado por</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Data de criação</TableCell>
            <TableCell align="right">Editar</TableCell>
            <TableCell align="right">Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.user.username}</TableCell>
              <TableCell>{post.category && post.category.name}</TableCell>
              <TableCell>{moment(post.createdAt).format('DD/MM/YYYY HH:mm')}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => handleEdit(post.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => openDialog(post.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Pagination
          count={lastPage}
          page={page}
          onChange={(event, page) => setPage(page)}
          color="primary" />
      </div>

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
              Tem certeza que deseja excluir este post?
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
