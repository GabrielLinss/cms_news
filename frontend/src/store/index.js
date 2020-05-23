import { createStore } from 'redux';

const INITIAL_STATE = {
  page: 1,
  lastPage: 1,
  data: []
};

function posts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOAD_POSTS':
      return { data: action.posts, page: action.page, lastPage: action.lastPage }
    default:
      return state
  }
}

const store = createStore(posts);

export default store;
