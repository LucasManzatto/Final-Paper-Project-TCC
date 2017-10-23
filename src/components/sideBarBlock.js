import React, { Component } from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

//redux
import {connect} from 'react-redux';

const style={
    textAlign: 'center'
}

const SideBarBlock = props =>{

    const showProperties = property =>{
        <TextField
            value={property}
            floatingLabelText="Frequência"
        />
    }

    return(
        <List>
            <Subheader>{props.clickedBlock.name}</Subheader>
            {_.map(props.clickedBlock,showProperties)}
            <TextField
                value={props.clickedBlock.freq}
                floatingLabelText="Frequência"
            />
            <TextField
                value={props.clickedBlock.amp}
                floatingLabelText="Amplitude"
            />
        </List>
    );
}
const mapStateToProps = state =>{
    return{
        clickedBlock : state.app.clickedBlock
    }
}
export default connect(mapStateToProps)(SideBarBlock);
