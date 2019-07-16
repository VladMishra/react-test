import Menu from './Menu';
import { List } from 'immutable';
import { compose, setDisplayName, withProps } from 'recompose';

const menuList = () => List([
	{ id: 1, title: 'HOME', url: '/' },
	{ id: 2, title: 'Userlist', url: '/userlist' },
	{ id: 3, title: 'page3', url: '/' }
]);

const addProps = () => ({
	menuList: menuList()
});

const enhance = compose(
	setDisplayName('MenuContainer'),
	withProps(addProps)
);

export default enhance(Menu);

