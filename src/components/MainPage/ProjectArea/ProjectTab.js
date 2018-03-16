import React from 'react';
import Paper from 'material-ui/Paper';
import _ from 'lodash';

import Block from './Block';

const style={
    height: 620
}
const ProjectTab = props =>{
    const blocks = _.map(props.blocks, block =>{
        return <Block key={block.id} block={block}/>
    });
    return(
        <Paper className="projectTab" zDepth={2} style={style}>
            {blocks}
        </Paper>
    )
};
export default ProjectTab;
