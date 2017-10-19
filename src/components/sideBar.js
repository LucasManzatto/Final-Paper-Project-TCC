import React, { Component } from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {grey900,grey50,blue500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

let SelectableList = makeSelectable(List);

const subHeaderStyle={
    backgroundColor : blue500,
    color : grey50
}
const style={
    height:730
}


const SideBar = props =>(
    <Paper zDepth={1} style={style}>
        <SelectableList defaultValue={3}>
          <Subheader style={subHeaderStyle}>Blocos</Subheader>
          <ListItem
            value={1}
            primaryText="Bloco 1"
          />
          <ListItem
            value={2}
            primaryText="Bloco 2"
          />
          <ListItem
            value={3}
            primaryText="Bloco 3"
          />
          <ListItem
            value={4}
            primaryText="Bloco 4"
          />
        </SelectableList>
    </Paper>
);
export default SideBar;
