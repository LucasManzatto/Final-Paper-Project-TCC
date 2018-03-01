import React from 'react';
import Paper from 'material-ui/Paper';
import _ from 'lodash';
import { SteppedLineTo } from 'react-lineto';


import Block from './Block';

const style={
    height: 620
}
const ProjectTab = props =>{
    const blocks = _.map(props.blocks, block =>{
        return <Block className="class3" key={block.id} block={block}/>
    });
    return(
        <Paper className="projectTab" zDepth={2} style={style}>
            {blocks}
            <Paper className="class1" style={{height:100 ,width:100, marginBottom:100}}>
            </Paper>
            <Paper className="class2" style={{height:100 ,width:100}}>
            </Paper>
        </Paper>
    )
};
export default ProjectTab;
