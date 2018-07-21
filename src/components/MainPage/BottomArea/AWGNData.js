import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { blockUpdated, updateBlockValue } from "../actions";

import { scaleLinear } from "d3-scale";
import { axisRight } from "d3-axis";
import { Axis } from "./axis";
import { Line } from "./Line";
import { findMinMax, shiftArray ,getScales} from "../utils";
import { rnorm } from "randgen";

class AWGNData extends React.Component {
  constructor(props) {
    const dataCarrier = props.blocks[1].data;
    const dataBPSK = props.blocks[2].data;
    const binaryArrayDecoded = [];
    dataBPSK.forEach((item, index) => {
      if (item != dataCarrier[index]) {
        console.log("number");
      }
    });
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

  render() {
    const { height, width, block ,blocks} = this.props;
    const { data ,blockLink1} = this.state;
    const scale = getScales(data, {height, width}, block,this.props.resolution, blocks[blockLink1.links[1]].amplitude);
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
