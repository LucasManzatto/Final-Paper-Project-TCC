import React from 'react';
import Paper from 'material-ui/Paper';
import _ from 'lodash';

import Block from './Block';

const style={
    height: 600
}

const ProjectTab = props =>{
    const renderBlocks = _.map(props.blocks, block =>{
        return <Block key={block.id} block={block}/>
    });
    return(
        <Paper className="projectTab" style={style}>
            {renderBlocks}
        </Paper>
    )
};
export default ProjectTab;
