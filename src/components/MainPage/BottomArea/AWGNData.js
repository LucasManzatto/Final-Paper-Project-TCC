import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import { blockUpdated, updateBlockValue } from "../actions";

import { axisRight } from "d3-axis";
import { Axis } from "./axis";
import { Line } from "./Line";
import { shiftArray, getScales } from "../utils";
import { rnorm } from "randgen";

class AWGNData extends React.Component {
  constructor(props) {
    const dataCarrier = _.clone(props.blocks[1].data);
    const dataBPSK = _.clone(props.blocks[2].data);
    dataBPSK.forEach((item, index) => {
      if (item !== dataCarrier[index]) {
      }
    });
    super(props);
    this.updateData = this.updateData.bind(this);
    let blockLink1 = {};
    if (props.blocks[props.block.links[0]] != null) {
      blockLink1 = _.clone(props.blocks[props.block.links[0]]);
      let data = this.createDataArray(blockLink1.data);
      props.updateBlockValue({ block: props.block, key: "data", value: data });
      this.state = {
        data,
        blockLink1
      };
    }
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

  createDataArray = data => {
    let awgnArray = [];
    data.forEach(item => {
      awgnArray.push(item + rnorm());
    });
    return awgnArray;
  };

  render() {
    const { dimensions, block, blocks, clickedBlock } = this.props;
    const { data, blockLink1 } = this.state;
    let amplitude = 3;
    if (blockLink1.links[1] != null) {
      amplitude = blocks[blockLink1.links[1]].amplitude;
    }
    const scale = getScales(data, dimensions, block, this.props.resolution, amplitude);
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
    if (!nextProps_blockLink1.linked) {
      this.props.updateBlockValue({
        block: this.props.block,
        key: "linked",
        value: false
      });
    }
    if (nextProps_blockLink1.data !== this.state.blockLink1.data && nextProps_blockLink1.linked) {
      let data = this.createDataArray(nextProps_blockLink1.data);
      this.props.updateBlockValue({
        block: this.props.block,
        key: "data",
        value: data
      });
      this.setState({ data, blockLink1: nextProps_blockLink1 });
    }
  }
}
AWGNData.propTypes = {
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
)(AWGNData);
