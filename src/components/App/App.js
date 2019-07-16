import React from 'react';
import { withRouter } from 'react-router-dom';
import { Main } from 'components';

import Routes from 'root/Routes';

const App = props => (
	<Main { ...props }>
		<Routes />
	</Main>);

export default withRouter(App);
