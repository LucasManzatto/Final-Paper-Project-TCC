import React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';

import ProjectTab from './ProjectTab';

//redux
import {connect} from 'react-redux';
import {updateCurrentProject} from '../actions';


const ProjectArea = props =>{
    return(
        <div className='tabs'>
            <Tabs  indicatorColor="primary" textColor="primary" value={0}>
                <Tab label={props.project.name} key={props.project.id} value={props.project.id} />
            </Tabs>
            <ProjectTab key="0" blocks={props.project.blocks}/>
        </div>
    );
    }

const mapStateToProps = state =>{
    return{
        //projects : projectsSelector(state)
        project : state.mainPage.present.projects[0]
    }
}
export default connect(mapStateToProps,{updateCurrentProject})(ProjectArea);
