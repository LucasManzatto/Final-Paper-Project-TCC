import React from "react";
import Paper from "material-ui/Paper";
import _ from "lodash";
import { connect } from "react-redux";
import Dimensions from "react-dimensions";

import Block from "./Block";
import * as actions from "../actions";

const style = {
  height: 600,
  zIndex: -10
};

const ProjectTab = props => {
  let width = props.containerWidth;
  let height = props.containerHeight;
  const renderBlocks = _.map(props.blocks, block => {
    return (
      <Block key={block.id} block={block} dimensions={{ width, height }} />
    );
  });
  return (
    <Paper className="projectTab" style={style}>
      {renderBlocks}
    </Paper>
  );
};
export default Dimensions()(ProjectTab);
