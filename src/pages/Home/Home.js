import React from 'react';
import PropTypes from 'prop-types';

import { Home } from 'components';

const HomePage = ({ userName }) => <Home userName={ userName } />;

HomePage.propTypes = {
	userName: PropTypes.string
};

export default HomePage;
