import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { blockUpdated, updateBlockValue } from "../actions";

import { scaleLinear } from "d3-scale";
import { axisRight } from "d3-axis";
import { Axis } from "./axis";
import { Line } from "./Line";
import { findMinMax, shiftArray ,getScales} from "../utils";

class BinaryData extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    let data = this.createDataArray(props);
    props.updateBlockValue({ id: props.block.id, key: "data", value: data });
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
  createFullArray(array) {
    let data = [];
    array.forEach((item, index) => {
      data.push({
        x: index,
        y: item
      });
    });
    return data;
  }

  createDataArray() {
    const { resolution, block } = this.props;
    const dataArray = block.binary;
    const totalTime = resolution;
    const size = totalTime / dataArray.length;
    let index = 0;
    let binaryAux = [];
    dataArray.forEach(item => {
      for (let i = 0; i < size; i++) {
        binaryAux[index++] = item;
      }
    });
    return binaryAux;
  }

  componentDidMount() {
    this.animationId = window.requestAnimationFrame(this.updateData);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationId);
  }
  render() {
    const { height, width, block } = this.props;
    const { data } = this.state;
    const scale = getScales(data, { height, width }, block,this.props.resolution);
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
    state
  };
};
export default connect(
  mapStateToProps,
  { blockUpdated, updateBlockValue }
)(BinaryData);
