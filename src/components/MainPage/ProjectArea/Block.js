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

class Block extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            projectTabOffset :0,
            offsetX:0,
            offsetY:0,
            blockPosition : props.block.position
        }
    }
    renderLines = () => {
        let {mainPage,selectLink,block} = this.props;
        let {offsetX,offsetY,blockPosition} = this.state;
        return(
            block.links.map(linkPosition => {
                let linkBlock = mainPage.present.projects[mainPage.present.currentProject].blocks[linkPosition];
                let borderStyle="solid";
                if(mainPage.present.selectedLink.id === block.id && mainPage.present.selectedLink.linkPosition === linkPosition){
                    borderStyle="dashed";
                }
                return(
                    <div key={linkPosition} onClick={event => selectLink({id: block.id,linkPosition})}>
                        <Line borderWidth={4} borderStyle={borderStyle} borderColor="black" zIndex={1}
                            x0={blockPosition.x + blockWidth/2 + offsetX}
                            y0={blockPosition.y + blockHeight/2 +offsetY}
                            x1={linkBlock.position.x + blockWidth/2+ offsetX}
                            y1={linkBlock.position.y + blockHeight/2 + offsetY}
                        />
                    </div>
                    );
            })
        )
    }
    showProperties = (value,key)=>{
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
                        <Left onClick={(event,value)=> this.onClickHandler(this.props.block[key] - 1,key)} style={iconStyle}/>
                        {value}
                        <Right onClick={(event,value)=> this.onClickHandler(this.props.block[key] + 1,key)} style={iconStyle}/>
                    </div>
                );
            }
    }
    onClickHandler = (value,key) =>{
        this.props.updateBlockValue({value,key,id: this.props.block.id});
        this.props.blockUpdated({block: this.props.block,updated: true});
    }

    handleDrag = (e,ui) => {
        this.handleClick();
        const {x, y} = this.state.blockPosition;
        const deltaPosition ={
            x: x + ui.deltaX,
            y: y + ui.deltaY
        };
        this.setState({
            blockPosition : deltaPosition
        })
        this.props.trackLocation({block: this.props.block,deltaPosition});
    }

    handleClick = () =>{
        if(this.props.block !== this.props.mainPage.present.clickedBlock){
            this.props.blockClicked(this.props.block);
        }
    }
    componentWillReceiveProps = nextProps =>{
        this.calculateOffset();
    }

    componentDidMount = () =>{
        this.props.blockClicked(this.props.block);
        this.calculateOffset();
    }
    calculateOffset = () =>{
        let projectTabOffset = document.getElementsByClassName('projectTab')[0].getBoundingClientRect();
        let offsetX = window.pageXOffset + projectTabOffset.left;
        let offsetY = window.pageYOffset + projectTabOffset.top;
        this.setState({
            projectTabOffset,
            offsetX,offsetY
        })
    }
    getBounds = () =>{
        return {left: 0,top: 0,right:this.state.projectTabOffset.width - blockWidth,bottom:this.state.projectTabOffset.height - blockHeight}
    }
    getPosition = bounds =>{
        let position = {x: this.state.blockPosition.x, y: this.state.blockPosition.y};
        if(position.x > bounds.right){
            position.x = bounds.right;
        }
        if(position.y > bounds.bottom){
            position.y = bounds.bottom
        }
        return position
    }

    render = () =>{
        const {block,dimensions} = this.props;
        const bounds=this.getBounds();
        const position = this.getPosition(bounds);
        return(
            <Draggable grid={[10, 10]} bounds={bounds} onDrag={this.handleDrag} position={position}>
                <div style={blockStyle} onClick={this.handleClick}>
                    <div style={{textAlign: 'center', fontWeight: 'bold'}}>{block.name}</div>
                    {_.map(block,this.showProperties)}
                    {/* <FlatButton label="Link" primary={true}></FlatButton> */}
                    {!_.isNil(block.links) ? this.renderLines() : []}
                </div>
            </Draggable>
        );
    }
}


const mapStateToProps = state =>{
    return state;
}

export default connect(mapStateToProps,actions)(Block);
