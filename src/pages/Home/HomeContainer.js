import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle, setDisplayName } from 'recompose';

import { userActions } from 'reducers';

import Home from './Home';

const mapStateToProps = state => ({
	userName: state.getIn([ 'user', 'userName' ], '')
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			setUserName: userActions.setUserName
		},
		dispatch
	);

const lifecycleEvents = {
	componentDidMount() {
		this.props.setUserName('NAME');
	},
	componentWillUnmount() {}
};

const enhance = compose(
	setDisplayName('HomeContainer'),
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	lifecycle(lifecycleEvents)
);

export default enhance(Home);
