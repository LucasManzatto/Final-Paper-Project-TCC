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
    const session = orm.mutableSession(initialState);
    const {Block,Project,UI} = session;

    const projeto = Project.create({
        name: "Project 1"
    })
    const projeto2 = Project.create({
        name: "Project 2"
    })

    const squareWave = Block.create({
        name: 'Random Number Generator',
        frequency: 1,
        amplitude: 2,
        type: 'square',
        position : {x:200 , y: 530}
    });
    const ui = UI.create({
        clickedBlock :squareWave,
        currentProject : 0,
    })
    console.log(ui);

    const carrierWave = Block.create({
        name: 'Carrier Wave',
        frequency: 3,
        amplitude: 4,
        type:'sine',
        position : {x:0 , y: 300}
    });
    const Bpsk = Block.create({
        name: 'BPSK',
        frequency: 3,
        amplitude: 4,
        type : 'bpsk',
        position : {x:200, y: 120}
    });
    const block4 = Block.create({
        name: 'Random Number Generator',
        frequency: 1,
        amplitude: 2,
        type: 'square',
        position : {x:200 , y: 530}
    });

    projeto.blocks.add(squareWave);
    projeto.blocks.add(carrierWave);
    projeto.blocks.add(Bpsk);

    projeto2.blocks.add(block4);
    return initialState;
}
const initialState = bootstrapState();

ReactDOM.render(
    <Provider store={createStore(reducers,
        {
        orm : initialState
        },
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )}>
        <App />
    </Provider>
    ,
     document.getElementById('root'));
registerServiceWorker();
