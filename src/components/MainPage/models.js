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
                UI.withId(0).currentProject = action.payload;
                break;
        }
    }
}
UI.modelName = 'UI';
UI.fields = {
    id: attr(),
    clickedBlock : attr(),
    currentProject : attr(),
};


export class Block extends Model {
    static reducer(action,Block,session) {
        switch(action.type){
            default:
                return null;
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
                const block3 = {
                    name: 'BPSK',
                    frequency :5,
                    amplitude :5,
                    type : 'bpsk',
                    position : {x:200, y: 120}
                };
                Project.withId(0).blocks.add(block3);
                break;
            case consts.TRACK_LOCATION:
                let block = action.payload.block;
                block.position = action.payload.deltaPosition;
                Project.withId(0).blocks.update(block);
                break;
            case consts.UPDATE_BLOCK:
                let block2 = session.UI.withId(0).clickedBlock;
                const {key,value} = action.payload;
                block2[key] = value;
                Project.withId(0).blocks.update(block2);
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
