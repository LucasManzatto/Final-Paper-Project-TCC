import { createSelector } from 'redux-orm';

import  orm  from '../MainPage/models';

export const clickedBlockSelector = createSelector(orm, state =>
    state.orm, session => {
    const clickedBlock =session.UI.withId(0).id;
    return session.Block.all().toRefArray().filter(block => block.id === clickedBlock)[0]
});

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
