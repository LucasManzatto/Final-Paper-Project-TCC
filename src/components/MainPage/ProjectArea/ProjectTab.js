import React from 'react';
import Paper from 'material-ui/Paper';
import _ from 'lodash';

import Block from './Block';

const style={
    height: 620
}

const createProjectBlocks = block =>{
    return(
    <Block key={block.id} block={block}/>
    )
}

const ProjectTab = props =>{
    console.log(Object.keys(props.blocks));
    return(
        <Paper zDepth={1} style={style}>
            {_.map(props.blocks,createProjectBlocks)}
        </Paper>
    )
};
export default ProjectTab;
