import React from "react";
//Imports dos components do projeto
import { withStyles } from "@material-ui/core/styles";
import BottomArea from "./BottomArea/bottomArea";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import ProjectArea from "./ProjectArea/projectArea";
import _ from "lodash";

import Menu from "./Menu";
import SideBar from "./SideBar/sideBar";
import SideBarBlock from "./SideBar/sideBarBlock";

import { deleteLink, deleteBlock } from "./actions";
import KeyHandler, { KEYPRESS } from "react-key-handler";

import { ActionCreators } from "redux-undo";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});
//FRAGMENT
const App = props => {
  return (
    <div style={{ paddingRight: 16, overflowY: "hidden" }}>
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="q"
        onKeyHandle={() => props.deleteBlock(props.clickedBlock)}
      />
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="x"
        onKeyHandle={() =>
          props.deleteLink({
            block: _.find(props.blocks, block => block.id === props.selectedLink.id),
            link: props.selectedLink.linkPosition
          })
        }
      />
      <KeyHandler keyEventName={KEYPRESS} keyValue="z" onKeyHandle={() => props.undo()} />
      <CssBaseline />
      <Grid container justify="flex-end" spacing={16}>
        <Grid container item xs={12} spacing={16}>
          <Grid xs item>
            <Menu />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={16}>
          <Grid xs={2} item>
            <SideBar />
          </Grid>
          <Grid xs={8} item>
            <ProjectArea />
          </Grid>
          <Grid xs={2} item>
            <SideBarBlock />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={16}>
          <Grid xs={12} item>
            <BottomArea />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteLink: payload => {
      dispatch(deleteLink(payload));
    },
    deleteBlock: clickedBlock => {
      dispatch(deleteBlock(clickedBlock));
    },
    undo: () => {
      dispatch(ActionCreators.undo());
    }
  };
};
const mapStateToProps = state => {
  return {
    clickedBlock: state.mainPage.present.clickedBlock,
    selectedLink: state.mainPage.present.selectedLink,
    blocks: state.mainPage.present.projects[0].blocks
  };
};

const AppWithStyles = withStyles(styles)(App);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWithStyles);
