import React from 'react';

//Material
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {grey50,blue500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';

import _ from 'lodash';

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

const SideBar = props =>{
    const ItemList = _.map(props.blocks, block =>{
        const onClickHandler = () =>{
            props.addBlockToProject(block);
        }
        return(
            <ListItem
                onClick={onClickHandler}
                key={block.id}
                value={block.id}
                primaryText={block.name}
                rightIcon={<ContentAdd />}
            />
        )
    })
    return(
        <Paper zDepth={1} style={style}>
            <SelectableList defaultValue={3}>
                <Subheader style={subHeaderStyle}>Blocos</Subheader>
                {ItemList}
            </SelectableList>
        </Paper>
    );
}

const mapStateToProps = state =>{
    return{
        blocks : state.mainPage.projects[state.mainPage.currentProject].blocks,
    }
}
export default connect(mapStateToProps,{addBlockToProject})(SideBar);
