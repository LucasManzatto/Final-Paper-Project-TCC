    import React from 'react';
import Draggable from 'react-draggable';
import _ from 'lodash';
import Subheader from 'material-ui/Subheader';

//redux
import {connect} from 'react-redux';
import {trackLocation,blockClicked} from '../actions';

const blockStyle={
    height: 100,
    width: 150,
    border: '1px solid black',
    backgroundColor : '#f5f5f5',
}


const Block = props =>{
    const showProperties = (value,key)=>{
            //Hide unwanted properties
            if(notHidden(key)){
                return(
                    <div key={key}>
                        <p>{_.capitalize(key)}:{value}</p>
                    </div>
                )
            }
    }
    const notHidden = key =>{
        if(key !== "id"
         && key !== "position"
         && key !== "type"
         && key !== "paused"
         && key !== "name"){
            return true;
        }
        return false;
    }

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
                <div style={{textAlign: 'center', fontWeight: 'bold'}}>{props.block.name}</div>
                {_.map(props.block,showProperties)}
            </div>
        </Draggable>
    );
}


const mapStateToProps = state =>{
    return state;
}

export default connect(mapStateToProps,{trackLocation,blockClicked})(Block);
