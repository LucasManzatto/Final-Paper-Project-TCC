import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { blockUpdated, updateBlockValue } from "../actions";

import { scaleLinear } from "d3-scale";
import { axisRight } from "d3-axis";
import { Axis } from "./axis";
import { Line } from "./Line";
import { findMinMax, shiftArray } from "../utils";
import { rnorm } from "randgen";

class AWGNData extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    const blockLink1 = props.blocks[props.block.links[0]];
    let data = this.createDataArray(blockLink1.data);
    props.updateBlockValue({ id: props.block.id, key: "data", value: data });
    this.state = {
      data,
      blockLink1
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

  createDataArray = data => {
    let awgnArray = [];
    data.forEach(item => {
      awgnArray.push(item + rnorm());
    });
    return awgnArray;
  };
  getScales = (data, height, width, block) => {
    const amplitude = this.props.blocks[this.state.blockLink1.links[1]]
      .amplitude;
    let tickValues;
    let scale = {
      xLine: 0,
      yLine: 0,
      yAxis: 0,
      tickValues: 0
    };
    let paddingxAxis = 30;
    let paddingyAxis = 20;
    const { minX, maxX, minY, maxY } = findMinMax(data, this.props.resolution);

    scale.xLine = scaleLinear()
      .domain([minX.toFixed(2), maxX.toFixed(2)])
      .range([paddingxAxis, width - paddingxAxis]);

    scale.yLine = scaleLinear()
      .domain([minY.toFixed(2), maxY.toFixed(2)])
      .range([height - paddingyAxis, paddingyAxis]);

    //Binary Block
    if (block.id === 0) {
      scale.yAxis = scaleLinear()
        .domain([0, 1])
        .range([height - paddingyAxis, paddingyAxis]);
      scale.tickValues = [-1, 0, 1];
    } else {
      scale.yAxis = scaleLinear()
        .domain([-amplitude / 2, amplitude / 2])
        .range([height - paddingyAxis, paddingyAxis]);
      scale.tickValues = [-amplitude / 2, 0, amplitude / 2];
    }
    return scale;
  };

  render() {
    const { height, width, block } = this.props;
    const { data } = this.state;
    const scale = this.getScales(data, height, width, block);
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
    const nextProps_blockLink1 = nextProps.blocks[nextProps.block.links[0]];
    if (nextProps_blockLink1 != this.state.blockLink1) {
      let data = this.createDataArray(nextProps_blockLink1.data);
      this.props.updateBlockValue({
        id: this.props.block.id,
        key: "data",
        value: data
      });
      this.setState({ data, blockLink1: nextProps_blockLink1 });
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
)(AWGNData);
