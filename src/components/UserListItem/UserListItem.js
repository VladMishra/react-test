import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, DropdownButton, Dropdown } from 'react-bootstrap';



const UserListItem = props => (
	<Fragment>		
		<div className="d-flex mt-2">
			<Col md={ 2 }>
				<p>{user.id}</p>
			</Col>
			<Col md={ 3 }>
				<p>{user.name}</p>
			</Col>
			<Col md={ 3 }>
				<p>{user.email}</p>
			</Col>
			<Col md={ 2 }>
				<p>{user.role}</p>
			</Col>
			<Col md={ 2 }>
				<DropdownButton id="userlist-actions-button" title="Actions">
					<Dropdown.Item >Edit</Dropdown.Item>
					<Dropdown.Item >Delete</Dropdown.Item>
				</DropdownButton>
			</Col>
		</div>		
	</Fragment>
);

UserListItem.propTypes = {
	userName: PropTypes.string
};

export default UserListItem;
