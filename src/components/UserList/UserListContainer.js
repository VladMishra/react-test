import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { compose, lifecycle, setDisplayName, withHandlers, withState } from 'recompose';
import { List } from 'immutable';

import { getConfig } from 'config';
import { getPageTitle } from 'selectors';
import { pageActions, userListActions, modalActions } from 'reducers';

import UsersList from './UserList';

export const mapStateToProps = state => ({
	// title: getPageTitle(state),
	userList: state.getIn([ 'userList', 'users', 'users' ], List())
	// users: state.getIn([ 'userList', 'users' ], OrderedSet()).toOrderedSet(),
	// continuationToken: state.getIn([ 'userList', 'continuationToken' ], ''),
	// allowRegister: state.getIn([ 'userList', 'tenantData', 'allowSelfOnboarding' ], false)
});

export const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getUserList: userListActions.getUserList,
			setUserToList: userListActions.setUserToList,
			addNewUser: userListActions.addNewUser
		},
		dispatch
	);

const interval = null;

const handlers = {
	saveSettings: props => () => {
		props.setSettings(props.settings);
	},
	// addNewUser: (props) => {
	// 	props.addNewUser();
	// }
};

const lifecycleEvents = {
	componentDidMount() {
		// this.props.getUserList();
		this.props.setUserToList();

	},
	componentDidUpdate(prevProps) {
		if (this.props.userList.size != prevProps.userList.size) {
			// debugger;
			// this.props.setUserList(this.props.userList);
		}

	}
};

const enhance = compose(
	setDisplayName('UsersListContainer'),
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withState('dropdown', 'setDropdown', {}),
	withState('q', 'setQ', ''),
	withState('q', 'setQ', ''),
	//withState('userList', 'setUserList', ''),
	// withState('order', 'setOrder', ''),
	// withState('showAddUserPopup', 'setShowAddUserPopup', false),
	// withState('showEditUserPopup', 'setShowEditUserPopup', false),
	withHandlers(handlers),
	withRouter,
	lifecycle(lifecycleEvents)
);

export default enhance(UsersList);
