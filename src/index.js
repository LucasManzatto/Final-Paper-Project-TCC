import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/MainPage/App';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import reducers from './rootReducer';

import  orm  from '../src/components/MainPage/models';

function bootstrapState() {
    const initialState = orm.getDefaultState();
    const session = orm.withMutations(initialState);
    const {
        Block,
        Project,
    } = session;

    const projeto = Project.create({
        name: "Project 1"
    })

    const block = Block.create({
        name : 'Block 1',
        frequency: 1,
        amplitude: 2
    });
    const block2 = Block.create({
        name : 'Block 2',
        frequency: 1,
        amplitude: 2
    });

     projeto.blocks.add(block);
     projeto.blocks.add(block2);
    return initialState;
}
const initialState = bootstrapState();

ReactDOM.render(
    <Provider store={createStore(reducers,{
        orm : initialState
    })}>
        <App />
    </Provider>
    ,
     document.getElementById('root'));
registerServiceWorker();
