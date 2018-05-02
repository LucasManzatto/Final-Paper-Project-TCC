import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
//import Subheader from 'material-ui/Subheader';

//redux
import {connect} from 'react-redux';
import {updateBlockValue,updateDropDown} from '../actions';
//import {updateBlockValue} from '../SideBar/actions';

const SideBarBlock = props =>{
    return(
        <Paper style={{height:'100%'}}>
            <Typography variant="title" className='title' style={{textAlign:'center'}}>
                  {props.clickedBlock.name}
            </Typography>
            <List>
                <ListItem>
                    <ListItemText
                      primary="Description:"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                      primary="Formula:"
                    />
                </ListItem>
            </List>
        </Paper>
    );
}

const mapStateToProps = state =>{
    return{
        clickedBlock : state.mainPage.present.clickedBlock,
    }
}
export default connect(mapStateToProps,{updateBlockValue,updateDropDown})(SideBarBlock);
