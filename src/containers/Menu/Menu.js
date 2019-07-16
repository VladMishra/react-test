import React from 'react';
import { Navbar, ListGroup } from 'bootstrap-4-react';
import PropTypes from 'prop-types';

import { NavLink } from './Menu.style';

const Menu = ({ menuList }) => (
	<Navbar expand="md" bg="light">
		<ListGroup flush>
			{menuList.map(item => <ListGroup.Item bg="light" key={ item.id }><NavLink to={ item.url }>{ item.title }</NavLink></ListGroup.Item>)}
		</ListGroup>
	</Navbar>
);

Menu.propTypes = {
	menuList: PropTypes.object
};

export default Menu;
