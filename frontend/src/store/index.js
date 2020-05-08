import { createStore } from 'redux';

const INITIAL_STATE = {
  data: []
};

function posts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOAD_POSTS':
      return { data: action.posts }
    default:
      return state
  }
}

const store = createStore(posts);

export default store;
