import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'containers';

import { Container, Row, Col } from 'bootstrap-4-react';
import { HeightCol } from './Main.style';

const Main = ({ children }) => (
	<Fragment>
		<Fragment>
			<Container fluid>
				<Row>
					<HeightCol md="3" bg="light">
						<Menu />
					</HeightCol>
					<Col md="9">
						{ children }
					</Col>
				</Row>
			</Container>
		</Fragment>
	</Fragment>
);

Main.propTypes = {
	children: PropTypes.node
};

export default Main;
