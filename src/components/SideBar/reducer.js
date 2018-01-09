import * as consts from '../../constants';
import _ from 'lodash';

const initialState = {
    clickedBlock : "block1",
    slider: 2,
    blocks :{
        byId:{
            block1: {
                name: 'Random Number Generator',
                id:'block1',
                steppedLine: true
            },
            block2: {
                name: 'Carrier Wave',
                id:'block2',
                Frequency :2,
                Amplitude :4,
            },
            block3: {
                name: 'BPSK',
                id:'block3',
                Frequency :5,
                Amplitude :5,
            },
        },
        allIds : ["block1","block2","block3"]
    }
}

export default function sideBar(state = initialState,action){
    let newState;
    switch(action.type){
        default:
            return state;
        case consts.BLOCK_LIST:
            return initialState;
        case consts.BLOCK_CLICKED:
            return {...state,clickedBlock:action.payload};
        case consts.UPDATE_BLOCK:
        //update
            newState = state;
            newState.blocks.byId[state.clickedBlock.id].Frequency = 2;
            return newState;
    }
}

const updateBlockPosition = (position,block,newState) => {
    newState.projects.byId.project1.blocks[block].position = position;
    return newState;
}
