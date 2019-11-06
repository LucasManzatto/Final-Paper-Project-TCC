import React, { Fragment, useState } from "react";

//Material
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import _ from "lodash";

//Redux
import { connect } from "react-redux";
import { addBlockToProject } from "../actions";

const SideBar = props => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const onClickHandler = block => {
    props.addBlockToProject({ block, idCounter: props.idCounter });
  };

  //Cria a lista de items
  const ItemList = _.map(props.blocks, block => {
    return (
      <ListItem key={block.name} button onClick={() => onClickHandler(block)}>
        <ListItemText primary={block.name} />
      </ListItem>
    );
  });

  const blocksList =
    <List component="nav"
      subheader={
        <ListSubheader component="div" style={{ position: "inherit" }}>
          Blocks
        </ListSubheader>}>
      {ItemList}
    </List>

  return (
    <Fragment>
      <Hidden smUp>
        <Button onClick={() => setDrawerOpen(true)}>New Block</Button>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => setDrawerOpen(false)}
            onKeyDown={() => setDrawerOpen(false)}
          >
            <div style={{ width: 250 }}>
              {blocksList}
            </div>
          </div>
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Paper elevation={0} square={true} style={{ height: "100%" }}>
          {blocksList}
        </Paper>
      </Hidden>
    </Fragment>
  );
};
const mapStateToProps = state => {
  return {
    blocks: state.mainPage.present.blocks,
    idCounter: state.mainPage.present.idCounter
  };
};
export default connect(
  mapStateToProps,
  { addBlockToProject }
)(SideBar);
