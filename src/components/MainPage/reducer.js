import * as consts from '../../constants';
import _ from 'lodash';

const initialState = {
    blocks: {
        '0': {
            name: 'RNG',
            type: 'square',
            samples :120,
            position : {x:200 , y: 480},
            paused : false,
            binary : [0,1,0]
        },
        '1':{
            name: 'Carrier Wave',
            frequency: 4,
            amplitude: 4,
            type:'sine',
            position : {x:0 , y: 300},
            paused : false
        },
        '2': {
            name: 'BPSK',
            frequency: 4,
            amplitude: 4,
            type : 'bpsk',
            position : {x:200, y: 120},
            paused : false
        },
        '3' :{
            name: 'AWGN',
            type: 'awgn',
            position : {x:400 , y: 0},
            paused : false
        }
    }
}

export default function reducerUI(state = initialState,action){
    switch(action.type){
        default:
            return state;
        case consts.UPDATE_BLOCK:
            const {key,value,id} = action.payload;
            let block = {...state.blocks[id]};
            block[key] = value;
            return {...state, blocks: {
                ...state.blocks,
                 [id] : block
            }}
        // case consts.UPDATE_CURRENT_PROJECT:
        //     return {...state,currentProject : action.payload};
         }
    }
