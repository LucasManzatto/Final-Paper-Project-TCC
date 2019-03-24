/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/MainPage/App';
import LoginPage from './components/LoginPage/LoginPage';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import mainPage from './components/MainPage/reducer';
import 'typeface-roboto';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';

import undoable from 'redux-undo';

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger';

const reducer = {
	mainPage: undoable(mainPage, { limit: 5 })
};

const middleware = [ ...getDefaultMiddleware(), logger ];

const store = configureStore({
	reducer,
	middleware,
	devTools: process.env.NODE_ENV !== 'production'
});

// const theme = createMuiTheme({   palette: {     background: { default:
// "#374785", paper: "#a8d0e6" },     primary: { main: "#24305e" },
// secondary: {       main: "#a8d0e6"     }   } });

const theme2 = createMuiTheme({
	palette: {
		background: {
			default: '#d3e3fc',
			paper: '#ffffff'
		},
		primary: {
			main: '#77a6f7'
		},
		secondary: {
			main: '#a8d0e6'
		}
	}
});
// const theme3 = createMuiTheme({   palette: {     background: { default:
// "#f2f2f2", paper: "#ffffff" },     primary: { main: "#3b945e" },
// secondary: {       main: "#57ba98"     }   } });

ReactDOM.render(
	<Fragment>
		<Provider store={store}>
			<MuiThemeProvider theme={theme2}>
				<Router>
						<Route path="/" component={App} />
				</Router>
			</MuiThemeProvider>
		</Provider>
	</Fragment>,
	document.getElementById('root')
);
registerServiceWorker();
