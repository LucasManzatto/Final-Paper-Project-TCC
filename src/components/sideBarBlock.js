import React from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

//redux
import {connect} from 'react-redux';

const SideBarBlock = props =>{
    console.log(props);
    const showProperties = (value,key)=>{
        if(key == "name"){
            return(
                <Subheader>{value}</Subheader>
            )
        }
        else{
            return(
                <TextField
                    value={value}
                    floatingLabelText={key}
                />
            )
        }
    }
    return(
        <List>
            {_.map(props.clickedBlock,showProperties)}
        </List>
    );
}
const mapStateToProps = state =>{
    return{
        clickedBlock : state.app.clickedBlock
    }
}
export default connect(mapStateToProps)(SideBarBlock);
