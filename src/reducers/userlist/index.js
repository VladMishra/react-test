import userListReducer, * as userListActions from './userlist';

const { SET_USER, setUserToList, GET_USERLIST, getUserList, addNewUser, ADD_NEW_USER } = userListActions;

export { SET_USER, setUserToList, GET_USERLIST, getUserList, addNewUser, ADD_NEW_USER };
export default userListReducer;
