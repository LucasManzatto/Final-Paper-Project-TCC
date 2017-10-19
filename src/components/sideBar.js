import React, { Component } from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

let SelectableList = makeSelectable(List);

const SideBar = () =>(
    <SelectableList defaultValue={3}>
      <Subheader>Blocos</Subheader>
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
);
export default SideBar;
