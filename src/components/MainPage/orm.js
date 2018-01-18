import { ORM } from 'redux-orm';
import { Block, Project } from './models';

const orm = new ORM();
orm.register(Block, Project);

export default orm;
