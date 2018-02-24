import React from 'react';
import Draggable from 'react-draggable';
import _ from 'lodash';
import FlatButton from 'material-ui/FlatButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
//redux
import {connect} from 'react-redux';
import {trackLocation,blockClicked,updateBlockValue} from '../actions';

import { Grid, Row, Col } from 'react-flexbox-grid';

const blockStyle={
    height: 100,
    width: 150,
    border: '1px solid black',
    backgroundColor : '#f5f5f5',
}
const iconStyle ={
    position: 'relative',
    top :'6px'
}

const Block = props =>{
    const showProperties = (value,key)=>{
            //Hide unwanted properties
            if(notHidden(key)){
                return (
                    <div key={key}>
                        <b>{_.capitalize(key)}:</b>
                        <NavigationChevronLeft onClick={(event,value)=> onClickHandler(--props.block[key],key)} style={iconStyle}/>
                        {value}
                        <NavigationChevronRight onClick={(event,value)=> onClickHandler(++props.block[key],key)} style={iconStyle}/>
                    </div>
                );
            }
    }
    const onClickHandler = (value,key) =>{
        const payload ={
            value,
            key,
            id: props.block.id
        }
        props.updateBlockValue(payload);
    }
    const notHidden = key =>{
        if(key !== "id"
         && key !== "position"
         && key !== "type"
         && key !== "paused"
         && key !== "name"
         && key !== "carrierWave"
         && key !== "source"){
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
                    {/* <FlatButton label="Link" primary={true}></FlatButton> */}
                </div>
        </Draggable>
    );
}


const mapStateToProps = state =>{
    return state;
}

export default connect(mapStateToProps,{trackLocation,blockClicked,updateBlockValue})(Block);
