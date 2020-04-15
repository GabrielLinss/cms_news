import React from 'react';

export default function EditPost(props) {
  const id = props.match.params.id;

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}
