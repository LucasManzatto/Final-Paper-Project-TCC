import React from 'react';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import { Row,Col} from 'react-flexbox-grid';
import BlockCard from './BlockCard';
import _ from 'lodash';

import {connect} from 'react-redux';
import {pauseBlock} from '../actions';
import ExpandBlockCard from './ExpandedBlockCard';

const style={
    height :200,
}

const BottomArea = props =>{
    const blockCards = _.map(props.blocks, block =>{
        return(
            <Col xs={3} key={block.id} style={{height:200 ,textAlign :'center' ,paddingBottom :30}}>
                <Row>
                    <Col xs={6}>
                        <FlatButton label={block.paused ? "Play" : "Pause"}
                          primary={true}
                          onClick={event => props.pauseBlock(block)}
                        />
                    </Col>
                    <Col xs={6}>
                        <ExpandBlockCard block={block}/>
                    </Col>
                </Row>
                <BlockCard block={block} amplitude={props.amplitude} key={block.id}/>
            </Col>
        )
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
        //blocks : blocksFromCurrentProjectSelector(state),
        amplitude : state.mainPage.amplitude,
        blocks: state.mainPage.projects[state.mainPage.currentProject].blocks
    }
}

export default connect(mapStateToProps,{pauseBlock})(BottomArea);
