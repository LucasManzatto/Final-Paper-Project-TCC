import React from 'react';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid';
import BlockCard from './BlockCard';
import _ from 'lodash';

import {connect} from 'react-redux';

const style={
    height :200,
}

const drawChart = block =>{
    return (
        <Col key={block.id} xs={3}>
            <BlockCard block={block}/>
        </Col>
    );
}

const BottomArea = props =>{
    return(
        <Paper zDepth={1} style={style}>
            <Row around="xs" middle="xs" style={style}>
                {_.map(props.blocks,drawChart)}
            </Row>
        </Paper>
    );
}

const mapStateToProps = state =>{
    const currentProject = state.projectArea.currentProject;
    return{
        blocks : state.projectArea.projects.byId[currentProject].blocks,
    }
}

export default connect(mapStateToProps)(BottomArea);
