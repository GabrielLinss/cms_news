import React from 'react';
import Dashboard from '../../components/Dashboard';

export default function EditPost(props) {
  const id = props.match.params.id;

  return (
    <Dashboard>
      <div>
        <h3>ID: {id}</h3>
      </div>
    </Dashboard>
  );
}
