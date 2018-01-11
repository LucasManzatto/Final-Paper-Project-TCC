import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import ProjectTab from './ProjectTab';
import _ from 'lodash';

//redux
import {connect} from 'react-redux';
import {updateCurrentProject} from '../actions';



const ProjectArea = props =>{
    const handleOnClick = (event,projectId) =>{
        props.updateCurrentProject(projectId);
    }
//Cria uma aba com todos os blocks no projects.byId.project.blocks
    const createTab = project =>(
        <Tab label={project.name} key={project.id} onActive={event => handleOnClick(event,project.id)}>
            <ProjectTab key={project.id} blocks={project.blocks} />
        </Tab>
    )
    return(
        <Tabs>
            {_.map(props.projects.byId,createTab)}
        </Tabs>
    );
}


const mapStateToProps = state =>{
    return{
        projects : state.mainPage.projects
    }
}
export default connect(mapStateToProps,{updateCurrentProject})(ProjectArea);
