import React, { Fragment } from "react";

//Material
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import Hidden from '@material-ui/core/Hidden';

import _ from "lodash";

//Redux
import { connect } from "react-redux";
import { addBlockToProject } from "../actions";

//let SelectableList = makeSelectable(List);

// const subHeaderStyle={
//     backgroundColor : blue500,
//     color : grey50
// }
const style = {
  height: "100%"
};

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};


const SideBar = props => {
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

  return (
    <Fragment>
      <Hidden mdUp>
        <Paper elevation={0} square={true} style={{ height: "100%", width: 600 }}>
          <List style={flexContainer} component="nav" subheader={<ListSubheader component="div" style={{ position: "inherit" }}>Blocks</ListSubheader>}>
            {ItemList}
          </List>
        </Paper>
      </Hidden>
      <Hidden mdDown>
        <Paper elevation={0} square={true} style={{ height: "100%" }}>
          <List component="nav" subheader={<ListSubheader component="div" style={{ position: "inherit" }}>Blocks</ListSubheader>}>
            {ItemList}
          </List>
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
