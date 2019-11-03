import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";
import Dimensions from "react-dimensions";
import ReactCursorPosition from "react-cursor-position";

//redux
import { connect } from "react-redux";
import { updateCurrentProject } from "../actions";
import Block from "./Block";

const ProjectArea = props => {
  let width = props.containerWidth;
  let height = props.containerHeight;
  return (
    <Fragment>
      <AppBar elevation={1} square={true} position="static">
        <Tabs value={0}>
          <Tab label={props.project.name} key={props.project.id} value={props.project.id} />
        </Tabs>
      </AppBar>
      <ReactCursorPosition>
        <ProjectTab key="0" blocks={props.project.blocks} dimensions={{ width, height }} />
      </ReactCursorPosition>
    </Fragment>
  );
};

const projectTabStyle = {
  height: 600,
  zIndex: -10
};

const ProjectTab = props => {
  const renderBlocks = _.map(props.blocks, block => {
    return (
      <Block
        cursorPosition={props.position}
        key={block.id}
        block={block}
        dimensions={props.dimensions}
      />
    );
  });
  return (
    <Paper square={true} elevation={0} className="projectTab" style={projectTabStyle}>
      {renderBlocks}
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    //projects : projectsSelector(state)
    project: state.mainPage.present.projects[0]
  };
};
const projectArea = connect(
  mapStateToProps,
  { updateCurrentProject }
)(ProjectArea);
export default Dimensions()(projectArea);
