import React from 'react';

//Material
//import {List, ListItem, makeSelectable} from 'material-ui/List';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
// import {grey50,blue500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import _ from 'lodash';

//Redux
import {connect} from 'react-redux';
import {addBlockToProject} from '../actions';

//let SelectableList = makeSelectable(List);

// const subHeaderStyle={
//     backgroundColor : blue500,
//     color : grey50
// }
const style={
    height:'100%'
}

const SideBar = props =>{
    const ItemList = _.map(props.blocks, block =>{
        // const onClickHandler = () =>{
        //     props.addBlockToProject(block);
        // }
        return(
            <ListItem key={block.id} button>
              <ListItemText primary={block.name}/>
            </ListItem>
        )
    })
    return(
        <Paper style={style}>
            <List
                component="nav"
                subheader={<ListSubheader component="div">Blocks</ListSubheader>}
            >
                {ItemList}
            </List>
        </Paper>
    );
}

const mapStateToProps = state =>{
    return{
        blocks : state.mainPage.present.projects[state.mainPage.present.currentProject].blocks,
    }
}
export default connect(mapStateToProps,{addBlockToProject})(SideBar);
