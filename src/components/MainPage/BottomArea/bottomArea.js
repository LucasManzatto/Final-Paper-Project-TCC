// @flow
import React from 'react';
import Paper from 'material-ui/Paper';
import { Row} from 'react-flexbox-grid';
import BlockCard from './BlockCard';
import _ from 'lodash';

import {connect} from 'react-redux';
import {blocksFromCurrentProjectSelector} from '../selectors'

const style={
    height :200,
}

const BottomArea = props =>{
    const blockCards = _.map(props.blocks, block =>{
        return(<BlockCard block={block} key={block.id}/>)
    })

    return(
        <Paper zDepth={1} style={style}>
            <Row around="xs" middle="xs" style={style}>
                {blockCards}
            </Row>
        </Paper>
    );
}

const mapStateToProps = state =>{
    return{
        blocks : blocksFromCurrentProjectSelector(state),
    }
}

export default connect(mapStateToProps)(BottomArea);
