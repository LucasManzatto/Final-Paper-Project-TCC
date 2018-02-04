import React from 'react';
import Draggable from 'react-draggable';

//redux
import {connect} from 'react-redux';
import {trackLocation,blockClicked} from '../actions';

const blockStyle={
    height: 80,
    width: 120,
    border: '1px solid black',
    backgroundColor : '#f5f5f5'
}


const Block = props =>{
    const handleDrag = (e,ui) => {
        handleClick();
        const {x, y} = props.block.position;
        const deltaPosition ={
            x: x + ui.deltaX,
            y: y + ui.deltaY
        };
        const payload = {
            block: props.block,
            deltaPosition
        };
        props.trackLocation(payload);
    }

    const handleClick = () =>{
        props.blockClicked(props.block);
    }

    const {x, y} = props.block.position;
    return(
        <Draggable bounds="parent" onDrag={handleDrag} defaultPosition={{x, y}}>
            <div style={blockStyle} onClick={handleClick}>
                {props.block.name}
            </div>
        </Draggable>
    );
}
const mapStateToProps = state =>{
    return state;
}

export default connect(mapStateToProps,{trackLocation,blockClicked})(Block);
