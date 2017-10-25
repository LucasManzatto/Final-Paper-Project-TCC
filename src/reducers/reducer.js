import {TRACK_LOCATION,BLOCK_LIST,BLOCK_CLICKED,ADD_TO_PROJECT,GET_PROJECT_BLOCKS} from '../actions/index';

import _ from 'lodash';

const initialState = {
    clickedBlock : {
        name: 'Bloco 1',
        id : 1,
        freq :10,
        amp :5
    },
    projects : {
        byId : {
            "project1" :{
                id: 1,
                name: "Project 1",
                blocks : ["block1","block2"]
            },
            "project2" :{
                id: 2,
                name: "Project 2",
                blocks : ["block3","block4"]
            }
        },
        allIds: ["project1","project2"]
    },
    blocks :{
        byId:{
            block1: {
                name: 'Bloco 1',
                id:'block1',
                freq :10,
                amp :5
            },
            block2: {
                name: 'Bloco 2',
                id:'block2',
                freq :8,
                amp :4
            },
            block3: {
                name: 'Bloco 3',
                id:'block3',
                freq :8,
                amp :4
            },
            block4: {
                name: 'Bloco 4',
                id:'block4',
                freq :8,
                amp :4
            },
        },
        allIds : ["block1","block2","block3","block4"]
    }
}

export default function(state = initialState,action){
    switch(action.type){
        case BLOCK_LIST:
            return initialState;
        case BLOCK_CLICKED:
            console.log(action.payload);
            return {...state,clickedBlock:action.payload};
        case ADD_TO_PROJECT:
            const block = getBlockById(action.payload,state);
            return {...state,projectBlocks:block}
        case TRACK_LOCATION:
            return state;
    }
    return state;
}

const getBlockById = (id,state) =>{
    _.find(state.blocos , {id})
}
