import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

const style={
    height: 680
}

const blockStyle={
    height: 80,
    width: 120,
    border: '1px solid black'
}

const DragDrop = props =>(
    <Paper zDepth={1} style={style}>
            <Draggable bounds="parent">
                <div style={blockStyle}>
                    Bloco 1
                </div>
            </Draggable>
    </Paper>
    )
export default DragDrop;
