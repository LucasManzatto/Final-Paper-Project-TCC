import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { blockUpdated, updateBlockValue } from "../actions";

import { scaleLinear } from "d3-scale";
import { axisRight } from "d3-axis";
import { Axis } from "./axis";
import { Line } from "./Line";
import { findMinMax, shiftArray, createTimeArray, getScales } from "../utils";

class CarrierWaveData extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    const { resolution, block } = this.props;
    let data = this.createDataArray(
      resolution,
      block.frequency,
      block.amplitude
    );
    props.updateBlockValue({ id: block.id, key: "data", value: data });
    this.state = { data };
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

  createDataArray(totalTime, frequency, amplitude) {
    let data = [];
    let time = createTimeArray(totalTime);
    const angularFrequency = 2 * Math.PI * frequency;
    time.forEach(currentTime => {
      let wt = angularFrequency * currentTime;
      data.push(amplitude * Math.sin(wt));
    });
    return data;
  }

  render() {
    const { height, width, block } = this.props;
    const { data } = this.state;
    const scale = getScales(
      data,
      { height, width },
      block,
      this.props.resolution,
      block.amplitude
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
  componentDidMount() {
    this.animationId = window.requestAnimationFrame(this.updateData);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationId);
  }
  componentWillReceiveProps(nextProps) {
    const { resolution, block } = nextProps;
    const { blocks } = this.props;
    if (block.updated) {
      let data = this.createDataArray(
        resolution,
        block.frequency,
        block.amplitude
      );
      this.props.updateBlockValue({ id: block.id, key: "data", value: data });
      this.props.blockUpdated({ block, updated: false });
      this.setState({ data });
    }
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
)(CarrierWaveData);
