import {ORM, many, attr, Model} from 'redux-orm';
import * as consts from '../../constants';
import _ from 'lodash';

export class UI extends Model {
    static reducer(action,UI,session) {
        switch(action.type){
            default:
                return null;
            case consts.BLOCK_CLICKED:
                UI.withId(0).clickedBlock = action.payload;
                break;
            case consts.UPDATE_CURRENT_PROJECT:
                //UI.withId(0).clickedBlock = {};
                UI.withId(0).currentProject = action.payload;
                break;
            case consts.UPDATE_DROPDOWN:
                UI.withId(0).dropDownMenuValues[action.payload.counter] = action.payload.value;
        }
    }
}
UI.modelName = 'UI';
UI.fields = {
    id: attr(),
    currentProject : attr(),
};


export class Block extends Model {
    static reducer(action,Block,session) {
        let block;
        switch(action.type){
            default:
                return null;
            case consts.PAUSE_BLOCK:
                Block.withId(action.payload.id).update({paused: !action.payload.paused})
                break;
            case consts.UPDATE_DATA:
                Block.withId(action.payload.block.id).update({data: action.payload.data})
                break;
            // case consts.UPDATE_BLOCK:
            //     block = _.clone(session.UI.withId(0).clickedBlock);
            //     const {key,value} = action.payload;
            //     block[key] = value;
            //     Block.withId(block.id).update(block);
            //     Block.withId(2).update({frequency : value});
            //     break;
            case consts.TRACK_LOCATION:
                Block.withId(action.payload.block.id).update({position: action.payload.deltaPosition});
                break;
        }
    }
}
Block.modelName = 'Block';
Block.fields = {
    id: attr(),
    name: attr(),
    frequency : attr(),
    amplitude : attr(),
    type: attr(),
    paused :attr(),
};
export class Project extends Model {
    static reducer(action,Project,session) {
        switch(action.type){
            default:
                return null;
            case consts.ADD_TO_PROJECT:
                //Project.withId(0).blocks.add();
                //break;

        }
    }
}
Project.modelName = 'Project';
Project.fields = {
    id: attr(),
    name: attr(),
    blocks: many('Block')
};

export const orm = new ORM();
orm.register(Block,Project,UI);

export default orm;
