import React from 'react';

//Material
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {grey50,blue500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import _ from 'lodash';

import {blocksSelector} from '../selectors';

//Redux
import {connect} from 'react-redux';
import {addBlockToProject} from '../actions';

let SelectableList = makeSelectable(List);

const subHeaderStyle={
    backgroundColor : blue500,
    color : grey50
}
const style={
    height:670
}
const buttonStyle={
    paddingTop:"6px",
};

const SideBar = props =>{
    const component = new React.Component(props);
    //Retorna a lista dos blocos e coloca um onClick em cada
    const createListItem = bloco =>{
        //Quando o item da lista é clicado o clickedBlock é atualizado
        const onClickHandler = () =>{
            component.props.addBlockToProject(bloco);
        }
        return(
                <ListItem
                onClick={onClickHandler}
                key={bloco.id}
                value={bloco.id}
                primaryText={bloco.name}
                rightIcon={<CommunicationChatBubble />}
            />
        )
    }

    component.render = () =>{
        console.log(component.props.blocks);
        return(
            <Paper zDepth={1} style={style}>
                <SelectableList defaultValue={3}>
                  <Subheader style={subHeaderStyle}>Blocos</Subheader>
                  {_.map(component.props.blocks,createListItem)}
                </SelectableList>
            </Paper>
        );
    };
    return component;
}

const mapStateToProps = state =>{
    return{
        blocks : blocksSelector(state),
    }
}
export default connect(mapStateToProps,{addBlockToProject})(SideBar);
