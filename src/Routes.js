import React from 'react';
import { Switch, Route } from 'react-router';

import { Home, UserList } from 'pages';

const Routes = () => (
	<Switch>
		<Route exact path="/" component={ Home } />
		<Route exact path="/userlist" component={ UserList } />

	</Switch>
);

export default Routes;
