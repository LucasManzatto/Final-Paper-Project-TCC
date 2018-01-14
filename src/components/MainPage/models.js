import {ORM, fk, many, attr, Model} from 'redux-orm';
import * as consts from '../../constants';

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
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    frequency : attr(),
    amplitude : attr()
    //authors: many('Author', 'books'),
    //publisher: fk('Publisher', 'books'),
};
export class Project extends Model {
    static reducer(action,Project,session) {
        switch(action.type){
            default:
                return null;
            case consts.ADD_TO_PROJECT:
                const testProject= {
                    name : "Projeto 2",
                }
                Project.withId(0).blocks.add(action.payload);
                break;
                //Project.withId("project1").blocks.add(block);
        }
    }
}
Project.modelName = 'Project';
Project.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    blocks: many('Block')
    //authors: many('Author', 'books'),
    //publisher: fk('Publisher', 'books'),
};

export const orm = new ORM();
orm.register(Block,Project);

// const initialState = orm.getEmptyState(); // getDefaultState -> getEmptyState
// const session = orm.session(initialState); // .session instead of .from

export default orm;
