import React, { Component } from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

const style={
    textAlign: 'center'
}

const SideBarBlock = () =>(
    <List>
        <Subheader>Bloco X</Subheader>
        <TextField
            defaultValue="0"
            floatingLabelText="Propriedade 1"
        />
        <TextField
            defaultValue="10"
            floatingLabelText="Propriedade 2"
        />
        <TextField
            defaultValue="25"
            floatingLabelText="Propriedade 3"
        />
        <TextField
            defaultValue="8"
            floatingLabelText="Propriedade 4"
        />
    </List>
);
export default SideBarBlock;
