import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Title from '../Title';
import api from '../../services/api';
import moment from 'moment';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    api.get('/posts').then(response => {
      setPosts(response.data.data);
      setTotal(response.data.total);
    });
  }, []);

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem('token');

      await api.delete(`posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPosts(posts.filter(post => post.id !== id));
      setTotal(total - 1);
    } catch (error) {
      alert('Erro ao deletar post, tente novamente.');
    }
  }

  function handleEdit(id) {
    history.push(`/posts/edit?p=${id}`);
  }

  return (
    <>
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
              <TableCell>{post.category.name}</TableCell>
              <TableCell>{moment(post.createdAt).format('DD/MM/YYYY HH:mm')}</TableCell>
              <TableCell align="right">
                <Link color="primary" href="#" onClick={() => handleEdit(post.id)}>
                  <EditIcon/>
                </Link>
              </TableCell>
              <TableCell align="right">
                <Link color="primary" href="#" onClick={() => handleDelete(post.id)}>
                  <DeleteIcon/>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver mais posts
        </Link>
      </div>
    </>
  );
}
