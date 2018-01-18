import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import ProjectTab from './ProjectTab';
import _ from 'lodash';

//redux
import {connect} from 'react-redux';
import {updateCurrentProject} from '../actions';
import {projectsSelector} from '../selectors';


const ProjectArea = props =>{
    const component = new React.Component(props);
    component.componentWillReceiveProps = props =>{
        component.props = props;
        console.log(component.props);

    }
    const handleOnClick = (event,projectId) =>{
        props.updateCurrentProject(projectId);
    }
//Cria uma aba com todos os blocks no projects.byId.project.blocks
    const projects = _.map(component.props.projects,project =>{
        return (
            <Tab label={project._fields.name} key={project._fields.id} onActive={event => handleOnClick(event,project.id)}>
                <ProjectTab key={project._fields.id} blocks={project.blocks} />
            </Tab>
        )
    })
    component.render = () =>{
        return(
            <Tabs>
                {projects}
            </Tabs>
        );
    }
    return component;
    }

const mapStateToProps = state =>{
    return{
        projects : projectsSelector(state)
    }
}
export default connect(mapStateToProps,{updateCurrentProject})(ProjectArea);
