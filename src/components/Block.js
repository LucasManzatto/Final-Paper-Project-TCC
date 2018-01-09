import React from 'react';
import Draggable from 'react-draggable'; // Both at the same time
import _ from 'lodash';
//redux
import {connect} from 'react-redux';
import {trackLocation} from '../actions/index';

const blockStyle={
    height: 80,
    width: 120,
    border: '1px solid black'
}


const Block = props =>{
    //Procura o block na lista de blocks de acordo com o ID do block no projeto
    //Para não haver duplicação
    const block = _.find(props.blocks,{'id' : props.block.id});
    const handleDrag = (e,ui) => {
       const deltaPosition ={
            x: x + ui.deltaX,
            y: y + ui.deltaY
        };
        const payload = {
            block,deltaPosition
        };
        console.log(payload);
        props.trackLocation(payload);
    }

    const {x, y} = props.block.position;
    return(
        <Draggable bounds="parent" onDrag={handleDrag} defaultPosition={{x, y}}>
            <div style={blockStyle}>
                {block.name}
            </div>
        </Draggable>
    );
}

const mapStateToProps = state =>{
    return{
        blocks : state.app.blocks.byId
    }
}

export default connect(mapStateToProps,{trackLocation})(Block);
