import { createStore } from 'redux';

const INITIAL_STATE = {};

function execute(state = INITIAL_STATE, action) {}

const store = createStore(execute);

export default store;
