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
    position: 'absolute',
    zIndex: 2
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
         && key !== "absolutePosition"
         && key !== "linked"
        ){
            return true;
        }
        return false;
    }

    const handleDrag = (e,ui) => {
        handleClick();
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
    }

    const handleClick = () =>{
        if(block !== mainPage.clickedBlock){
            blockClicked(block);
        }
    }

    component.componentDidMount = () =>{
        blockClicked(block);
        offsetX = window.pageXOffset;
        offsetY = window.pageYOffset;
        const projectTabOffset = document.getElementsByClassName('projectTab')[0].getBoundingClientRect();
        offsetX += projectTabOffset.left;
        offsetY += projectTabOffset.top;
    }

    component.render = () =>{
        const {x, y} = block.position;
        let linkLine,linkLine2;
        if(block.linked){
            let linkBlock = mainPage.projects[mainPage.currentProject].blocks[1];
            let linkBlock2 = mainPage.projects[mainPage.currentProject].blocks[0];
            if(block.name !== linkBlock.name){
                linkLine = <Line borderColor="black" zIndex={1}
                        x0={block.position.x + width/2 + offsetX}
                        y0={block.position.y + height/2 +offsetY}
                        x1={linkBlock.position.x + width/2+ offsetX}
                        y1={linkBlock.position.y + height/2 + offsetY}
                        />
                linkLine2 = <Line borderColor="black" zIndex={1}
                        x0={block.position.x + width/2 + offsetX}
                        y0={block.position.y + height/2 +offsetY}
                        x1={linkBlock2.position.x + width/2 + offsetX}
                        y1={linkBlock2.position.y + height/2 + offsetY}
                        />
            }
        }

        return(
            <Draggable bounds="parent" onDrag={handleDrag} defaultPosition={{x, y}}>
                <div style={blockStyle} onClick={handleClick}>
                    <div style={{textAlign: 'center', fontWeight: 'bold'}}>{block.name}</div>
                    {_.map(block,showProperties)}
                    {/* <FlatButton label="Link" primary={true}></FlatButton> */}
                    {linkLine}
                    {linkLine2}
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
