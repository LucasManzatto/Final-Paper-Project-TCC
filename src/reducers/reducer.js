import {BLOCK_LIST,INITIAL_STATE,BLOCK_CLICKED} from '../actions/index';

const initialState = {
    clickedBlock : {
        name: 'Bloco 1',
        id : 1,
        freq :10,
        amp :5
    },
    blocos :[
        {
            name: 'Bloco 1',
            id : 1,
            freq :10,
            amp :5
        },
        {
            name: 'Bloco 2',
            id : 2,
            freq :8,
            amp :4
        }
    ]
}
export default function(state = initialState,action){
    switch(action.type){
        case BLOCK_LIST:
            return initialState;
        case INITIAL_STATE:
            return initialState;
        case BLOCK_CLICKED:
            console.log(action.payload);
            return {...state,clickedBlock:action.payload};
    }
    return state;
}
