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
    super(props);
    this.updateData = this.updateData.bind(this);
    let blockLinkData = {};
    blockLinkData = _.clone(_.find(props.blocks, block => block.id === props.block.links[0]));
    let data = this.createDataArray(blockLinkData.data);
    props.updateBlockValue({ block: props.block, key: "data", value: data });
    this.state = {
      data,
      blockLinkData
    };
  }

  createDataArray = data => {
    let awgnArray = [];
    data.forEach(item => {
      awgnArray.push(item + rnorm());
    });
    return awgnArray;
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
    const nextProps_blockLinkData = _.clone(
      _.find(this.props.blocks, block => block.id === this.props.block.links[0])
    );
    // if (!nextProps_blockLink1.linked) {
    //   this.props.updateBlockValue({
    //     block: this.props.block,
    //     key: "linked",
    //     value: false
    //   });
    // }
    if (nextProps_blockLinkData.data !== this.state.blockLinkData.data) {
      let data = this.createDataArray(nextProps_blockLinkData.data);
      this.props.updateBlockValue({
        block: this.props.block,
        key: "data",
        value: data
      });
      this.setState({ data, blockLinkData: nextProps_blockLinkData });
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
  render() {
    const { dimensions, block, blocks, clickedBlock } = this.props;
    const { data, blockLinkData } = this.state;
    let amplitude = -1;
    let getAmplitude = _.find(blocks, block => block.id === blockLinkData.links[0]);
    try {
      if ("amplitude" in getAmplitude)
        amplitude = _.find(blocks, block => block.id === blockLinkData.links[0]).amplitude;
      else {
        amplitude = _.find(blocks, block => block.id === blockLinkData.links[1]).amplitude;
      }
    } catch (err) {}
    const scale = getScales(data, dimensions, block, this.props.resolution, amplitude);
    if (amplitude !== -1) {
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
    } else {
      return null;
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
