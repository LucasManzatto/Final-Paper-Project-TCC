import React from 'react';
import Draggable from 'react-draggable'; // Both at the same time
import _ from 'lodash';
//redux
import {connect} from 'react-redux';
import {trackLocation} from '../actions';

const blockStyle={
    height: 80,
    width: 120,
    border: '1px solid black',
    backgroundColor : 'white'
}


const Block = props =>{
    const handleDrag = (e,ui) => {
        const {x, y} = props.block.position;
        const deltaPosition ={
            x: x + ui.deltaX,
            y: y + ui.deltaY
        };
        const payload = {
            deltaPosition
        };
        props.trackLocation(payload);
    }
    
    const {x, y} = props.block.position;
    return(
        <Draggable bounds="parent" onDrag={handleDrag} defaultPosition={{x, y}}>
            <div style={blockStyle}>
                {props.block.name}
            </div>
        </Draggable>
    );
}

export default Block;
