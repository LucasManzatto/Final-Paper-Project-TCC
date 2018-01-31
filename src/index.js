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
    const initialState = orm.getEmptyState();
    const session = orm.withMutations(initialState);
    const {
        Block,
        Project,
        UI
    } = session;

    const projeto = Project.create({
        name: "Project 1"
    })
    const projeto2 = Project.create({
        name: "Project 2"
    })

    const block = Block.create({
        name: 'Random Number Generator',
        frequency: 1,
        amplitude: 2,
        steppedLine: true,
        position : {x:200 , y: 530}
    });

    const ui = UI.create({
        clickedBlock : block,
        currentProject : 0
    })

    const block2 = Block.create({
        name: 'Carrier Wave',
        frequency: 3,
        amplitude: 4,
        position : {x:0 , y: 300}
    });
    const block3 = Block.create({
        name: 'BPSK',
        frequency :5,
        amplitude :5,
        position : {x:200, y: 120}
    });

    projeto.blocks.add(block);
    projeto.blocks.add(block2);
    projeto.blocks.add(block3);
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
