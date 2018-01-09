import * as consts from '../../constants';
import _ from 'lodash';

const initialState = {
    currentProject : "project1",
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
}

export default function projectArea(state = initialState,action){
    let newState;
    let block;
    switch(action.type){
        default:
            return state;
        case consts.TRACK_LOCATION:
            newState = state;
            block = action.payload.block.id;
            newState.projects.byId.project1.blocks[block].position = action.payload.deltaPosition;
            return {...state,newState};
        case consts.UPDATE_CURRENT_PROJECT:
            return {...state,currentProject : action.payload};
        }
}
