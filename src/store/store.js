import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';

import { Map } from 'immutable';

import { userReducer, userListReducer } from 'reducers';

import defaultState from './defaultState';

const rootReducer = combineReducers({
	user: userReducer,
	userList: userListReducer
});

const getInitialStore = () => Map(defaultState);

export default additionalMiddleware => createStore(rootReducer, getInitialStore(), additionalMiddleware);
