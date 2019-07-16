import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'bootstrap-4-react';

const Home = props => <Alert primary>Hello { props.userName }</Alert>;

Home.propTypes = {
	userName: PropTypes.string
};

export default Home;
