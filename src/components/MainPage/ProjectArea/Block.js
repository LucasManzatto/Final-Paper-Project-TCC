import React from 'react';
import Draggable from 'react-draggable';
import _ from 'lodash';
import { Line } from 'react-lineto';
import Left from 'material-ui-icons/ChevronLeft';
import Right from 'material-ui-icons/ChevronRight';
import keydown from 'react-keydown';

import {notHidden} from '../utils';

//redux
import {connect} from 'react-redux';
import * as actions from '../actions';

const blockHeight = 100;
const blockWidth = 160;
const blockStyle={
    height: blockHeight,
    width:  blockWidth,
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
    const component = new React.Component(props);
    let offsetX,offsetY,projectTabOffset =0;
    let linkLine = [];

    const renderLines = () => {
        let {block,mainPage,selectLink} = component.props;
        return(
            block.links.map(linkPosition => {
                let linkBlock = mainPage.present.projects[mainPage.present.currentProject].blocks[linkPosition];
                let borderStyle="solid";
                if(mainPage.present.selectedLink.id === block.id && mainPage.present.selectedLink.linkPosition === linkPosition){
                    borderStyle="dashed";
                }
                return(
                    <div key={linkPosition}  onClick={event => selectLink({id: block.id,linkPosition})}>
                        <Line borderWidth={4} borderStyle={borderStyle} borderColor="black" zIndex={1}
                            x0={block.position.x + blockWidth/2 + offsetX}
                            y0={block.position.y + blockHeight/2 +offsetY}
                            x1={linkBlock.position.x + blockWidth/2+ offsetX}
                            y1={linkBlock.position.y + blockHeight/2 + offsetY}
                        />
                    </div>
                    );
            })
        )
    }
    const showProperties = (value,key)=>{
            if(key === 'binary'){
                return (
                    <div key={key}>
                        <b>{_.capitalize(key)}:</b>
                        {value}
                    </div>
                );
            }
            //Hide unwanted properties
            if(notHidden(key)){
                return (
                    <div key={key}>
                        <b>{_.capitalize(key)}:</b>
                        <Left onClick={(event,value)=> onClickHandler(--component.props.block[key],key)} style={iconStyle}/>
                        {value}
                        <Right onClick={(event,value)=> onClickHandler(++component.props.block[key],key)} style={iconStyle}/>
                    </div>
                );
            }
    }
    const onClickHandler = (value,key) =>{
        component.props.updateBlockValue({value,key,id: component.props.block.id});
        component.props.blockUpdated({block: component.props.block,updated: true});
    }

    const handleDrag = (e,ui) => {
        const {block,trackLocation} = component.props;
        handleClick();
        const {x, y} = block.position;
        const deltaPosition ={
            x: x + ui.deltaX,
            y: y + ui.deltaY
        };
        trackLocation({block,deltaPosition});
    }

    const handleClick = () =>{
        if(component.props.block !== component.props.mainPage.present.clickedBlock){
            component.props.blockClicked(component.props.block);
        }
    }

    component.componentDidMount = () =>{
        component.props.blockClicked(component.props.block);
        projectTabOffset = document.getElementsByClassName('projectTab')[0].getBoundingClientRect();
        offsetX = window.pageXOffset + projectTabOffset.left;
        offsetY = window.pageYOffset + projectTabOffset.top;
    }

    component.render = () =>{
        const {block} = component.props;
        const {x, y} = block.position;
        linkLine = [];
        if(block.linked){
            linkLine = renderLines();
        }
        return(
            <Draggable bounds={{left: 0,top: 0,right:projectTabOffset.width - blockWidth,bottom:projectTabOffset.height - blockHeight}} onDrag={handleDrag} defaultPosition={{x, y}}>
                <div style={blockStyle} onClick={handleClick}>
                    <div style={{textAlign: 'center', fontWeight: 'bold'}}>{block.name}</div>
                    {_.map(block,showProperties)}
                    {/* <FlatButton label="Link" primary={true}></FlatButton> */}
                    {linkLine}
                </div>
            </Draggable>
        );
    }
    return component;
}


const mapStateToProps = state =>{
    return state;
}

export default connect(mapStateToProps,actions)(Block);
