import React from "react";

//Material
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";

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
    <Paper elevation={0} square={true} style={style}>
      <List component="nav" subheader={<ListSubheader component="div">Blocks</ListSubheader>}>
        {ItemList}
      </List>
    </Paper>
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
