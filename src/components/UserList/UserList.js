import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { Button, Container, Col, Form } from 'react-bootstrap';
import UserListItem from 'components';
import ImmutablePropTypes from 'react-immutable-proptypes';

const someNewUser = {
	id: 9,
	name: 'User9',
	email: 'user9@gmail.com',
	chiefId: '3',
	active: true,
	role: 'developer'
};

const UserList = props => (
	<Container>
		<Col md={ 12 } className="mt-5">
			<div className="d-flex">
				<Col md={ 6 }>
					<h3 className="">Userlist</h3>
				</Col>
				<Col md={ 6 }>
					<div className="d-flex">
						<Form.Control type="text" variant="outline-warning" placeholder="Enter a username"></Form.Control>
						<Button variant="warning" className="ml-3">Search</Button>
					</div>
				</Col>
			</div>
		</Col>
		<Col md={ 12 } className="mt-5"> 
			{/* <Button variant="success" onClick={ () => props.addNewUser(someNewUser) }>Add new user</Button> */}
			<Button variant="success" onClick={ () => props.addNewUser(someNewUser) }>Add new user</Button>
			<Button variat="failure" onClick={ () => console.log(props) }>get props </Button>
		</Col>
		<Col md={ 12 } className="mt-5">
			<div className="d-flex">
				<Col md={ 2 }>
					<p>ID</p>
				</Col>
				<Col md={ 3 }>
					<p>Name</p>
				</Col>
				<Col md={ 3 }>
					<p>Email</p>
				</Col>
				<Col md={ 2 }>
					<p>Role</p>
				</Col>
				<Col md={ 2 } />
			</div>
		</Col>
		<Col md={ 12 }>
			{props.userList.map((user, i) => (
				<div className="d-flex mt-2" key={ i }>
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
						{/* <DropdownButton id="userlist-actions-button" title="Actions">
							<Dropdown.Item >Edit</Dropdown.Item>
							<Dropdown.Item >Delete</Dropdown.Item>
						</DropdownButton> */}
					</Col>
				</div>
			))}
		</Col>
	</Container>
);

UserList.propTypes = {
	userList: PropTypes.array,
	title: PropTypes.string,
	dropdown: PropTypes.object,
	search: PropTypes.func,
	addNewUser: PropTypes.func,
	editUser: PropTypes.func,
	userId: PropTypes.string
};

UserList.defaultPage = {
	userList: new List(),
	userId: '',
	dropdown: {},
	toggle: () => {},
	continuationToken: ''
};

export default UserList;
