import * as consts from 'constants';
import _ from 'lodash';

const initialState = {
    currentProject : "project1",
    clickedBlock : "block1",
    slider: 2,
    projects : {
        byId : {
            "project1" :{
                id: 'project1',
                name: "Project 1",
                blocksIds : ["block1","block2","block3"],
                blocks : {
                    "block1" :{
                        id : "block1",
                        position : {x:0 , y: 530},
                    },
                    "block2" :{
                        id : "block2",
                        position : {x:0 , y: 300},
                    },
                    "block3" :{
                        id : "block3",
                        position : {x:200, y: 100},
                    }
                }
            },
            "project2" :{
                id: 'project2',
                name: "Project 2",
                blocks : {
                    "block3" :{
                        id : "block3",
                        position : {x:0 , y: 510},
                    },
                }
            }
        },
        allIds: ["project1","project2"]
    },
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

export default function(state = initialState,action){
    let newState;
    let block;
    switch(action.type){
        default:
            return state;
        case consts.BLOCK_LIST:
            return initialState;
        case consts.BLOCK_CLICKED:
            return {...state,clickedBlock:action.payload};
        case consts.ADD_TO_PROJECT:
            block = getBlockById(action.payload,state);
            return {...state,projectBlocks:block}
        case consts.TRACK_LOCATION:
            newState = state;
            block = action.payload.block.id;
            newState.projects.byId.project1.blocks[block].position = action.payload.deltaPosition;

            return {...state,newState};
        case consts.UPDATE_CURRENT_PROJECT:
            return {...state,currentProject : action.payload};
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
const getBlockById = (id,state) =>{
    return _.find(state.blocks.byId , {id})
}
