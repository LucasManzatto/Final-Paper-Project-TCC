import React from 'react';
import Paper from 'material-ui/Paper';
import {Card,CardMedia} from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import BlockCard from './BlockCard';
import _ from 'lodash';

import {connect} from 'react-redux';
import {blocksSelector} from '../selectors'

const style={
    height :200,
}

const BottomArea = props =>{
    return(
        <Paper zDepth={1} style={style}>
            <Row around="xs" middle="xs" style={style}>
                <BlockCard type="square"/>
                <BlockCard type="sine" />
            </Row>
        </Paper>
    );
}

const mapStateToProps = state =>{
    return{
        blocks : blocksSelector(state),
    }
}

export default connect(mapStateToProps)(BottomArea);
