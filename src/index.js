import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/MainPage/App';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import reducers from './rootReducer';


ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>
    ,
     document.getElementById('root'));
registerServiceWorker();
