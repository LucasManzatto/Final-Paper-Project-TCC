import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//Imports dos components do projeto
import Menu from "./Menu";
import SideBar from "./SideBar/sideBar";
import SideBarBlock from "./SideBar/sideBarBlock";
import ProjectArea from "./ProjectArea/projectArea";
import BottomArea from "./BottomArea/bottomArea";

import KeyHandler, { KEYPRESS } from "react-key-handler";
import { deleteLink, deleteBlock } from "./actions";

import { connect } from "react-redux";
import { ActionCreators } from "redux-undo";

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
      <KeyHandler keyEventName={KEYPRESS} keyValue="x" onKeyHandle={() => props.deleteLink()} />
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
    deleteLink: () => {
      dispatch(deleteLink());
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
  return { clickedBlock: state.mainPage.present.clickedBlock };
};

const AppWithStyles = withStyles(styles)(App);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWithStyles);
