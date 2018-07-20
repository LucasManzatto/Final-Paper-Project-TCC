import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { blockUpdated, updateBlockValue } from "../actions";

import { scaleLinear } from "d3-scale";
import { axisRight } from "d3-axis";
import { Axis } from "./axis";
import { Line } from "./Line";
import { findMinMax, shiftArray, createTimeArray, getScales } from "../utils";

class BPSKData extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    const blockLink1 = props.blocks[props.block.links[0]];
    const blockLink2 = props.blocks[props.block.links[1]];
    let data = this.createDataArray(
      blockLink1.data,
      props.resolution,
      blockLink2
    );
    props.updateBlockValue({ id: props.block.id, key: "data", value: data });
    this.state = {
      data,
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
    this.setState(
      {
        data: new_data
      },
      () => {
        window.requestAnimationFrame(this.updateData);
      }
    );
  }
  createDataArray = (binaryArray, totalTime, blockLink2) => {
    let data = [];
    let time = createTimeArray(totalTime);
    const angularFrequency = 2 * Math.PI * blockLink2.frequency;
    time.forEach((currentTime, index) => {
      let wt = angularFrequency * currentTime;
      data.push(binaryArray[index] * blockLink2.data[index]);
    });
    return data;
  };

  componentDidMount() {
    this.animationId = window.requestAnimationFrame(this.updateData);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationId);
  }
  componentWillReceiveProps(nextProps) {
    const blockLink1 = nextProps.blocks[nextProps.block.links[0]];
    const nextProps_blockLink2 = nextProps.blocks[nextProps.block.links[1]];
    if (nextProps_blockLink2 != this.state.blockLink2) {
      let data = this.createDataArray(
        blockLink1.data,
        this.props.resolution,
        nextProps_blockLink2
      );
      this.props.updateBlockValue({
        id: this.props.block.id,
        key: "data",
        value: data
      });
      this.setState({ data, blockLink2: nextProps_blockLink2 });
    }
  }
  render() {
    const { height, width, block } = this.props;
    const { data } = this.state;
    const scale = getScales(
      data,
      { height, width },
      block,
      this.props.resolution,
      this.state.blockLink2.amplitude
    );
    return (
      <g>
        <Line xScale={scale.xLine} yScale={scale.yLine} data={data} />
        <Axis
          axis={axisRight}
          tickValues={scale.tickValues}
          scale={scale.yAxis}
        />
      </g>
    );
  }
}
const mapStateToProps = state => {
  return {
    blocks: state.mainPage.present.projects[0].blocks
  };
};
export default connect(
  mapStateToProps,
  { blockUpdated, updateBlockValue }
)(BPSKData);
