import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle, setDisplayName } from 'recompose';

import { userListActions } from 'reducers';

import UserList from './UserList';

// const mapStateToProps = state => ({
// 	userList: state.userList
// });

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			setUserToList: userListActions.setUserToList,
			getUserList: userListActions.getUserList,
			addNewUser: userListActions.addNewUser
		},
		dispatch
	);

const lifecycleEvents = {
	componentDidMount() {
		//this.props.getUserList();
	},
	componentWillUnmount() {}
};

const enhance = compose(
	setDisplayName('UserListContainer'),
	connect(
		// mapStateToProps,
		mapDispatchToProps
	),
	lifecycle(lifecycleEvents)
);

export default enhance(UserList);
