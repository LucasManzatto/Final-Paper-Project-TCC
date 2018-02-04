import { createSelector } from 'redux-orm';

import  orm  from '../MainPage/models';

export const clickedBlockSelector = createSelector(orm, state =>
    state.orm, session => {
    const clickedBlock =session.UI.withId(0).clickedBlock.id;
    return session.Block.all().toRefArray().filter(block => block.id === clickedBlock)[0]
});

export const blocksSelector = createSelector(orm, state =>
    state.orm, session => {
    return session.Block.all().toRefArray();
});
export const blocksFromCurrentProjectSelector = createSelector(orm, state =>
    state.orm, session => {
    let currentProject = session.UI.withId(0).currentProject;
    return session.Project.withId(currentProject).blocks.all().toRefArray();
});

export const projectsSelector = createSelector(orm, state =>
    state.orm, session => {
    return session.Project.all().toModelArray().map(project =>{
        return {...project, blocks : project.blocks.all().toRefArray()}
    });
});
export const sideBarBlockSelector = createSelector(orm, state =>
    state.orm, session => {
    return session.UI.withId(0).dropDownMenuValues;
});
