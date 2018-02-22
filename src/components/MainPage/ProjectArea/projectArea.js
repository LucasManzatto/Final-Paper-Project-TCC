import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import ProjectTab from './ProjectTab';
import _ from 'lodash';

//redux
import {connect} from 'react-redux';
import {updateCurrentProject} from '../actions';
import {projectsSelector} from '../selectors';


const ProjectArea = props =>{
    const handleOnClick = (event,projectId) =>{
        props.updateCurrentProject(projectId);
    }
//Cria uma aba com todos os blocks no projects.byId.project.blocks
    let projects = _.map(props.projects,project =>{
        return (
            <Tab label={project.name} key={project.id} onActive={event => handleOnClick(event,project.id)}>
                <ProjectTab key={project.id} blocks={project.blocks} />
            </Tab>
        )
    });
    return(
        <Tabs>
            {projects}
        </Tabs>
    );
    }

const mapStateToProps = state =>{
    return{
        //projects : projectsSelector(state)
        projects : state.mainPage.projects
    }
}
export default connect(mapStateToProps,{updateCurrentProject})(ProjectArea);
