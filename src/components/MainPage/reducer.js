import * as consts from '../../constants';
import _ from 'lodash';

const initialState = {
    clickedBlock : "block1",
    currentProject : 0,
    slider: 2,
    projects : {
        byId : {
            "project1" :{
                id: 'project1',
                name: "Project 1",
                blocksIds : [1,2,3],
                blocks : [
                    {
                        name: 'Random Number Generator',
                        id:'block1',
                        steppedLine: true,
                        position : {x:0 , y: 530}
                    },
                    {
                        name: 'Carrier Wave',
                        id:'block2',
                        Frequency :2,
                        Amplitude :4,
                        position : {x:0 , y: 300}
                    },
                    {
                        name: 'BPSK',
                        id:'block3',
                        Frequency :5,
                        Amplitude :5,
                        position : {x:200, y: 100}
                    },
                ]
            },
            "project2" :{
                id: 'project2',
                name: "Project 2",
                blocksIds : [1],
                blocks : {
                    1 :{
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
                steppedLine: true,
                position : {x:0, y: 0}
            },
            block2: {
                name: 'Carrier Wave',
                id:'block2',
                frequency :2,
                amplitude :4,
                position : {x:0, y: 0}
            },
            block3: {
                name: 'BPSK',
                id:'block3',
                frequency :5,
                amplitude :5,
                position : {x:0, y: 0}
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
        // case consts.ADD_TO_PROJECT:
        //     const newBlockId = state.projects.byId[state.currentProject].blocksIds.length + 1;
        //     const newBlock ={
        //         id: action.payload,
        //         position : {x:0, y:0}
        //     }
        //     newState = state;
        //     newState.projects.byId[state.currentProject].blocksIds.push(newBlockId);
        //     newState.projects.byId[state.currentProject].blocks[newBlockId] = newBlock;
        //     return {...state,newState}
        case consts.BLOCK_LIST:
            return initialState;
        case consts.BLOCK_CLICKED:
            return {...state,clickedBlock:action.payload};
        //case consts.UPDATE_BLOCK:
        //update
        //    newState = state;
        //    newState.blocks.byId[state.clickedBlock.id].Frequency = 2;
        //    return newState;
        case consts.UPDATE_CURRENT_PROJECT:
            return {...state,currentProject : action.payload};
        }
    }

const findBlockIndex = (state,blockID) =>{
    return state.projects.byId[state.currentProject].blocks
    .findIndex((obj => obj.id == blockID));
}

const updateBlockPosition = (payload,state) => {
    const position = payload.deltaPosition;
    const blockIndex = findBlockIndex(state,payload.block.id);
    const newState = state;
    newState.projects.byId.project1.blocks[blockIndex].position = position;
    return {...state,newState};
}
