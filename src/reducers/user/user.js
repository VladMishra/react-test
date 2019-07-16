import { Map } from 'immutable';

export const SET_USERNAME = 'SET_USERNAME';

export const setUserName = name => ({
	type: SET_USERNAME,
	payload: { name }
});

export default function (state = Map(), action = {}) {
	switch (action.type) {
		case SET_USERNAME:
			return state.set('userName', action.payload.name || 'not Name');

		default:
			return state;
	}
}
