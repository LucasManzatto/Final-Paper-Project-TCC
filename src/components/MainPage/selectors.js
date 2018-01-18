import { createSelector } from 'redux-orm';

import  orm  from '../MainPage/models';

export const blocksSelector = createSelector(orm, state =>
    state.orm, session => {
    return session.Block.all().toRefArray();
});

export const projectsSelector = createSelector(orm, state =>
    state.orm, session => {
    return session.Project.all().toModelArray().map(project =>{
        return {...project, blocks : project.blocks.all().toRefArray()}
    });
});
