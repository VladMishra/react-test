import styled from 'styled-components';
import { Link as NavigationLink } from 'react-router-dom';
import { ListGroup } from 'bootstrap-4-react';

export const ListItem = styled(ListGroup.Item)`
  width: 100%;
  cursore: pointer;
`;

export const NavLink = styled(NavigationLink)`
  text-decoration: none;
  color: black;
`;
