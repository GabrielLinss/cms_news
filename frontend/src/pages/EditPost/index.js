import React from 'react';
import qs from 'query-string';

export default function EditPost(props) {
  const query = qs.parse(props.location.search);

  return (
    <div>
      <h3>ID: {query.p}</h3>
    </div>
  );
}
