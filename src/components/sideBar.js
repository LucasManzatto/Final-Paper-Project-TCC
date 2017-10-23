import React from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {grey900,grey50,blue500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import _ from 'lodash';

//Redux
import {connect} from 'react-redux';
import {blockClicked} from '../actions/index';

let SelectableList = makeSelectable(List);

const subHeaderStyle={
    backgroundColor : blue500,
    color : grey50
}
const style={
    height:730
}
const lista = bloco =>{
    return(
        <ListItem
          value={1}
          primaryText={bloco}
        />
    )
}

const SideBar = props =>{
    const component = new React.Component(props);

    const lista = bloco =>{
        const onClickHandler = () =>{
            component.props.blockClicked(bloco);
        }
        return(
            <ListItem
                onClick={onClickHandler}
                key={bloco.id}
                value={bloco.id}
                primaryText={bloco.name}
            />
        )
    }

    component.render = () =>{
        return(
            <Paper zDepth={1} style={style}>
                <SelectableList defaultValue={3}>
                  <Subheader style={subHeaderStyle}>Blocos</Subheader>
                  {_.map(component.props.blocos,lista)}
                </SelectableList>
            </Paper>
        );
    };
    return component;
}

const mapStateToProps = state =>{
    return{
        blocos : state.app.blocos
    }
}
export default connect(mapStateToProps,{blockClicked})(SideBar);
