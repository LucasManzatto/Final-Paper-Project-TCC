import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import _ from 'lodash';
import { Line } from 'react-lineto';

import FlatButton from 'material-ui/FlatButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

//redux
import {connect} from 'react-redux';
import {trackLocation,blockClicked,updateBlockValue,trackAbsoluteLocation} from '../actions';

import { Grid, Row, Col } from 'react-flexbox-grid';

const blockStyle={
    height: 100,
    width: 160,
    border: '1px solid black',
    backgroundColor : '#f5f5f5',
    position: 'absolute'
}
const iconStyle ={
    position: 'relative',
    top :'6px'
}

const Block = props =>{
    const height = 100,width =160;
    const component = new React.Component(props);
    let offsetX,offsetY;
    const {block,blockClicked,updateBlockValue,trackLocation,mainPage} = component.props;
    const showProperties = (value,key)=>{
            //Hide unwanted properties
            if(notHidden(key)){
                return (
                    <div key={key}>
                        <b>{_.capitalize(key)}:</b>
                        <NavigationChevronLeft onClick={(event,value)=> onClickHandler(--block[key],key)} style={iconStyle}/>
                        {value}
                        <NavigationChevronRight onClick={(event,value)=> onClickHandler(++block[key],key)} style={iconStyle}/>
                    </div>
                );
            }
    }
    const onClickHandler = (value,key) =>{
        const payload ={
            value,
            key,
            id: block.id
        }
        updateBlockValue(payload);
    }
    const notHidden = key =>{
        if(key !== "id"
         && key !== "position"
         && key !== "type"
         && key !== "paused"
         && key !== "name"
         && key !== "carrierWave"
         && key !== "source"
         && key !== "absolutePosition"){
            return true;
        }
        return false;
    }

    const handleDrag = (e,ui) => {
        const {x, y} = block.position;
        const deltaPosition ={
            x: x + ui.deltaX,
            y: y + ui.deltaY
        };
        const payload = {
            block,
            deltaPosition
        };
        trackLocation(payload);
        handleClick();
    }

    const handleClick = () =>{
        if(block !== mainPage.clickedBlock){
            blockClicked(block);
        }
    }
    const {x, y} = block.position;
    component.componentDidMount = () =>{
        offsetX = window.pageXOffset;
        offsetY = window.pageYOffset;
        const boxp = document.getElementsByClassName('projectTab')[0].getBoundingClientRect();
        offsetX += boxp.left;
        offsetY += boxp.top;
    }
    component.render = () =>{
        let line;
        if(block.name !== mainPage.projects[mainPage.currentProject].blocks[1].name){
            line = <Line borderColor="black" zIndex={3} x0={block.position.x + offsetX} y0={block.position.y + height/2 +offsetY} x1={mainPage.projects[mainPage.currentProject].blocks[1].position.x + offsetX} y1={mainPage.projects[mainPage.currentProject].blocks[1].position.y + height/2 + offsetY} />
        }
        return(
            <Draggable bounds="parent" onDrag={handleDrag} defaultPosition={{x, y}}>
                <div style={blockStyle} onClick={handleClick}>
                    <div style={{textAlign: 'center', fontWeight: 'bold'}}>{block.name}</div>
                        {_.map(block,showProperties)}
                        {/* <FlatButton label="Link" primary={true}></FlatButton> */}
                        {line}
                    </div>
            </Draggable>
        );
    }
    return component;
}


const mapStateToProps = state =>{
    return state;
}

export default connect(mapStateToProps,{trackLocation,blockClicked,updateBlockValue})(Block);
