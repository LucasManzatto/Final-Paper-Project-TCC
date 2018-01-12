import {ORM, fk, many, attr, Model} from 'redux-orm';
import * as consts from '../../constants';

class Block extends Model {
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
class Project extends Model {
    static reducer(action,Project,session) {
        switch(action.type){
            default:
                return null;
            case consts.ADD_TO_PROJECT:
                const testProject= {
                    id: "project1",
                    name : "Projeto 1",
                    books : {}
                }
                Project.create(testProject);
                Project.withId("project1").blocks.add(action.payload);
                console.log(Project.withId("project1"));
        }
    }
}
Project.modelName = 'Project';
Project.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    blocks: many('Block', 'project')
    //authors: many('Author', 'books'),
    //publisher: fk('Publisher', 'books'),
};

export const orm = new ORM();
orm.register(Block,Project);
const initialState = orm.getEmptyState(); // getDefaultState -> getEmptyState
export const session = orm.session(initialState); // .session instead of .from


export default orm;
