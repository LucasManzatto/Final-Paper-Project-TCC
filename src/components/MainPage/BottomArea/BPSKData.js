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
    let blockLinkData, blockLinkCarrier;
    if (props.blocks[props.block.links[0]].name === "Data") {
      blockLinkData = _.clone(props.blocks[props.block.links[0]]);
      blockLinkCarrier = _.clone(props.blocks[props.block.links[1]]);
    } else {
      blockLinkData = _.clone(props.blocks[props.block.links[1]]);
      blockLinkCarrier = _.clone(props.blocks[props.block.links[0]]);
    }
    data = this.createDataArray(blockLinkData.data, props.resolution, blockLinkCarrier);
    props.updateBlockValue({ block: props.block, key: "data", value: data });
    this.state = {
      data,
      blockLinkData,
      blockLinkCarrier
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
  createDataArray = (binaryArray, totalTime, blockLinkCarrier) => {
    let data = [];
    let time = createTimeArray(totalTime);
    time.forEach((currentTime, index) => {
      data.push(binaryArray[index] * blockLinkCarrier.data[index]);
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
    if (nextProps.block.links < nextProps.block.neededLinks) {
      return;
    }
    let nextProps_blockLinkData, nextProps_blockLinkCarrier;
    if (this.props.blocks[nextProps.block.links[0]].name === "Data") {
      nextProps_blockLinkData = _.clone(nextProps.blocks[nextProps.block.links[0]]);
      nextProps_blockLinkCarrier = _.clone(nextProps.blocks[nextProps.block.links[1]]);
    } else {
      nextProps_blockLinkCarrier = _.clone(nextProps.blocks[nextProps.block.links[0]]);
      nextProps_blockLinkData = _.clone(nextProps.blocks[nextProps.block.links[1]]);
    }
    const differences = difference(nextProps_blockLinkCarrier, this.state.blockLinkCarrier);
    if (differences.hasOwnProperty("paused")) return;
    //If there is differences update the state
    if (nextProps_blockLinkCarrier.data !== this.state.blockLinkCarrier.data) {
      let data = this.createDataArray(
        nextProps_blockLinkData.data,
        this.props.resolution,
        nextProps_blockLinkCarrier
      );
      this.props.updateBlockValue({
        block: this.props.block,
        key: "data",
        value: data
      });
      this.setState({ data, blockLinkCarrier: nextProps_blockLinkCarrier });
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
      this.state.blockLinkCarrier.amplitude
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
