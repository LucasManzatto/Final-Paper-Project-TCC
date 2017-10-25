import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import ProjectTab from './ProjectTab';
import _ from 'lodash';

//redux
import {connect} from 'react-redux';

const createTab = project =>(
    <Tab label={project.name} key={project.id}>
        <ProjectTab blocks={project.blocks}>
        </ProjectTab>
    </Tab>
)

const ProjectArea = props =>(
    <Tabs>
        {_.map(props.projects.byId,createTab)}
    </Tabs>

);
const mapStateToProps = state =>{
    return{
        projects : state.app.projects
    }
}
export default connect(mapStateToProps)(ProjectArea);
