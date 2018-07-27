import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import { blockUpdated, updateBlockValue } from "../actions";

import { axisRight } from "d3-axis";
import { Axis } from "./axis";
import { Line } from "./Line";
import { shiftArray, createTimeArray, getScales, difference } from "../utils";

class BPSKData extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    let data = [];
    const blockLink1 = _.clone(props.blocks[props.block.links[0]]);
    const blockLink2 = _.clone(props.blocks[props.block.links[1]]);
    data = this.createDataArray(blockLink1.data, props.resolution, blockLink2);
    props.updateBlockValue({ block: props.block, key: "data", value: data });
    this.state = {
      data,
      blockLink1,
      blockLink2
    };
  }

  updateData() {
    const { block } = this.props;
    const { data } = this.state;
    let new_data = _.clone(data);
    if (!block.paused) {
      new_data = shiftArray(new_data);
    }
    if (this._ismounted) {
      this.setState(
        {
          data: new_data
        },
        () => {
          window.requestAnimationFrame(this.updateData);
        }
      );
    }
  }
  createDataArray = (binaryArray, totalTime, blockLink2) => {
    let data = [];
    let time = createTimeArray(totalTime);
    time.forEach((currentTime, index) => {
      data.push(binaryArray[index] * blockLink2.data[index]);
    });
    return data;
  };

  componentDidMount() {
    this._ismounted = true;
    this.animationId = window.requestAnimationFrame(this.updateData);
  }

  componentWillUnmount() {
    this._ismounted = false;
    window.cancelAnimationFrame(this.animationId);
  }
  componentWillReceiveProps(nextProps) {
    const nextProps_blockLink1 = _.clone(nextProps.blocks[nextProps.block.links[0]]);
    const nextProps_blockLink2 = _.clone(nextProps.blocks[nextProps.block.links[1]]);
    const differences = difference(nextProps_blockLink2, this.state.blockLink2);
    if (differences.hasOwnProperty("paused")) return;
    //If there is differences update the state
    if (nextProps_blockLink2.data !== this.state.blockLink2.data) {
      let data = this.createDataArray(
        nextProps_blockLink1.data,
        this.props.resolution,
        nextProps_blockLink2
      );
      this.props.updateBlockValue({
        block: this.props.block,
        key: "data",
        value: data
      });
      this.setState({ data, blockLink2: nextProps_blockLink2 });
    }
  }
  render() {
    const { dimensions, block, clickedBlock } = this.props;
    const { data } = this.state;
    const scale = getScales(
      data,
      dimensions,
      block,
      this.props.resolution,
      this.state.blockLink2.amplitude
    );
    return (
      <g>
        <Line
          xScale={scale.xLine}
          yScale={scale.yLine}
          data={data}
          focused={block === clickedBlock ? true : false}
        />
        <Axis axis={axisRight} tickValues={scale.tickValues} scale={scale.yAxis} />
      </g>
    );
  }
}

BPSKData.propTypes = {
  block: PropTypes.object,
  blockUpdated: PropTypes.func,
  updateBlockValue: PropTypes.func,
  dimensions: PropTypes.object,
  resolution: PropTypes.number
};

const mapStateToProps = state => {
  return {
    blocks: state.mainPage.present.projects[0].blocks,
    clickedBlock: state.mainPage.present.clickedBlock
  };
};
export default connect(
  mapStateToProps,
  { blockUpdated, updateBlockValue }
)(BPSKData);
