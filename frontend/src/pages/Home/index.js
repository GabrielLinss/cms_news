import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const res = await api.get('/posts');
      setPosts(res.data.data);
    }
    loadPosts();
  }, []);

  return (
    <ul>
      { posts.map(post => <li key={post.id}>{ post.title }</li>) }
    </ul>
  );
}
