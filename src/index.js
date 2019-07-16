import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Promise from 'es6-promise';
import store from 'store';
import Immutable from 'immutable';

import { App } from 'components';

Promise.polyfill();

const reduxDevTools =
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: { immutable: Immutable } });
const adminStore = store(reduxDevTools);


/*DEBUG*/
window.store = adminStore;
/*DEBUG*/


render(
	<BrowserRouter>
		<Provider store={ adminStore }>
			<App />
		</Provider>
	</BrowserRouter>,
	document.querySelector('#root')
);
