import { Map, List, fromJS } from 'immutable';

export const SET_USER = 'SET_USER';
export const GET_USERLIST = 'GET_USERLIST';
export const ADD_NEW_USER = 'ADD_NEW_USER';

import { users } from '../../schemas';

export const addNewUser = userID => ({
	type: ADD_NEW_USER,
	payload: userID
});

export const setUserToList = user => ({
	type: SET_USER,
	payload: { user }
});

export const getUserList = users => ({
	type: GET_USERLIST,
	payload: { users }
});

export default function (state = List(), action = {}) {
	// console.log(users);
	switch (action.type) {
		case SET_USER:
			// return state.set([ 'users', action.payload.user.userId ], fromJS(action.payload.user));
			
			return state.set('users', users);
			
		case GET_USERLIST:
			return state;

		case ADD_NEW_USER:
			

			return state.setIn([ 'users', 'users', users.users.length ], action.payload);
			

		default:
			return state;
	}
}
