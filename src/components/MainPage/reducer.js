import * as consts from '../../constants';
import _ from 'lodash';

const initialState = {
    clickedBlock : "block1",
    currentProject : "project1",
    slider: 2,
    projects : {
        byId : {
            "project1" :{
                id: 'project1',
                name: "Project 1",
                blocksIds : [1,2,3],
                blocks : {
                    1:{
                        id : "block1",
                        position : {x:0 , y: 530},
                    },
                    2 :{
                        id : "block2",
                        position : {x:0 , y: 300},
                    },
                    3 :{
                        id : "block3",
                        position : {x:200, y: 100},
                    },
                }
            },
            "project2" :{
                id: 'project2',
                name: "Project 2",
                blocks : {
                    "1" :{
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

export default function sideBar(state = initialState,action){
    let newState;
    switch(action.type){
        default:
            return state;
        case consts.ADD_TO_PROJECT:
            const newBlockId = state.projects.byId[state.currentProject].blocksIds.length + 1;
            const newBlock ={
                id: action.payload,
                position : {x:0, y:0}
            }
            newState = state;
            newState.projects.byId[state.currentProject].blocksIds.push(newBlockId);
            newState.projects.byId[state.currentProject].blocks[newBlockId] = newBlock;
            console.log(newState);
            return {...state,newState}
        case consts.BLOCK_LIST:
            return initialState;
        case consts.BLOCK_CLICKED:
            return {...state,clickedBlock:action.payload};
        case consts.UPDATE_BLOCK:
        //update
            newState = state;
            newState.blocks.byId[state.clickedBlock.id].Frequency = 2;
            return newState;
        case consts.TRACK_LOCATION:
            const block = action.payload.block.id;
            const newPosition= action.payload.deltaPosition;
            return updateBlockPosition(newPosition,block,state);
        case consts.UPDATE_CURRENT_PROJECT:
            return {...state,currentProject : action.payload};
        }
    }

const updateBlockPosition = (position,block,state) => {
    const newState = state;
    newState.projects.byId.project1.blocks[block].position = position;
    return {...state,newState};
}
