import {ORM, many, attr, Model} from 'redux-orm';
import * as consts from '../../constants';

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
        switch(action.type){
            default:
                return null;
            case consts.UPDATE_BLOCK:
                let block = session.UI.withId(0).clickedBlock;
                const {key,value} = action.payload;
                block[key] = value;
                Block.withId(block.id).update(block);
                Block.withId(2).update({frequency : value});
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
    type: attr()
};
export class Project extends Model {
    static reducer(action,Project,session) {
        switch(action.type){
            default:
                return null;
            case consts.ADD_TO_PROJECT:
                //Project.withId(0).blocks.add();
                //break;
            case consts.TRACK_LOCATION:
                let block = action.payload.block;
                block.position = action.payload.deltaPosition;
                Project.withId(session.UI.withId(0).currentProject).blocks.update(block);
                break;
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
