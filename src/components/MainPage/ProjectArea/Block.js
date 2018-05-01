import React from 'react';
import Draggable from 'react-draggable';
import _ from 'lodash';
import { Line } from 'react-lineto';
import Left from 'material-ui-icons/ChevronLeft';
import Right from 'material-ui-icons/ChevronRight';


//redux
import {connect} from 'react-redux';
import {trackLocation,blockClicked,updateBlockValue,deleteLink} from '../actions';

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
    let {block,blockClicked} = component.props;

    const renderLines = () => {
        return(
            component.props.block.links.map(link => {
                let linkBlock = component.props.mainPage.projects[component.props.mainPage.currentProject].blocks[link];
                return(
                    <div key={link} onClick={event => component.props.deleteLink({block,link})}>
                        <Line borderWidth={4} borderColor="black" zIndex={1}
                            x0={component.props.block.position.x + blockWidth/2 + offsetX}
                            y0={component.props.block.position.y + blockHeight/2 +offsetY}
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
        const payload ={
            value,
            key,
            id: component.props.block.id
        }
        component.props.updateBlockValue(payload);
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
         && key !== "samples"
         && key !== "bpsk"
         && key !== "links"
        ){
            return true;
        }
        return false;
    }

    const handleDrag = (e,ui) => {
        handleClick();
        const {x, y} = component.props.block.position;
        const deltaPosition ={
            x: x + ui.deltaX,
            y: y + ui.deltaY
        };
        const payload = {
            block : component.props.block,
            deltaPosition
        };
        component.props.trackLocation(payload);
    }

    const handleClick = () =>{
        if(component.props.block !== component.props.mainPage.clickedBlock){
            component.props.blockClicked(component.props.block);
        }
    }

    component.componentDidMount = () =>{
        component.props.blockClicked(component.props.block);
        projectTabOffset = document.getElementsByClassName('projectTab')[0].getBoundingClientRect();
        offsetX = window.pageXOffset + projectTabOffset.left;
        offsetY = window.pageYOffset + projectTabOffset.top;
    }
    // component.componentWillReceiveProps = nextProps =>{
    //     component.props = nextProps;
    // }

    component.render = () =>{
        const {x, y} = component.props.block.position;
        if(component.props.block.linked){
            linkLine = renderLines();
        }
        return(
            <Draggable bounds={{left: 0,top: 0,right:projectTabOffset.width - blockWidth,bottom:projectTabOffset.height - blockHeight}} onDrag={handleDrag} defaultPosition={{x, y}}>
                <div style={blockStyle} onClick={handleClick}>
                    <div style={{textAlign: 'center', fontWeight: 'bold'}}>{component.props.block.name}</div>
                    {_.map(component.props.block,showProperties)}
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

export default connect(mapStateToProps,{trackLocation,blockClicked,updateBlockValue,deleteLink})(Block);
