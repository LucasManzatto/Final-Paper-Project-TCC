import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import _ from 'lodash';

import Block from './Block';

const style={
    height: 680
}

const createProjectBlocks = block =>{
    return(
    <Block block={block}/>
    )
}

const ProjectTab = props =>{
    return(
        <Paper zDepth={1} style={style}>
            {_.map(props.blocks,createProjectBlocks)}
        </Paper>
    )
};
export default ProjectTab;
