import _ from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { Axis } from "./axis";
import { axisRight } from "d3-axis";
import { updateBlockValue } from "../actions";
import { Line } from "./line";
import { shiftArray, createTimeArray, getScales, difference, findLink } from "../utils";
import * as selectors from "../selectors";

class FSKData extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    const { blocks, block, resolution } = props;
    let data = [];

    //Para entrar aqui deve ter os 2 links, data e Carrier
    const blockLinkData = findLink("Data", blocks, block.links).data;
    const blockLinkCarrier = findLink("Carrier Wave", blocks, block.links);
    data = this.createDataArray(blockLinkData, resolution, blockLinkCarrier.frequency, blockLinkCarrier.amplitude);
    props.updateBlockValue({
      block: props.block,
      key: "data",
      value: data,
      indexOfBlock: props.indexOfBlock
    });
    this.state = {
      data,
      blockLinkCarrier
    };
  }

  createDataArray = (binaryArray, totalTime, frequency, amplitude) => {
    let data = [];
    let f1 = frequency
    let f2 = frequency * 2
    let time = createTimeArray(totalTime);
    time.forEach((currentTime, index) => {
      if (binaryArray[index] === 1) {
        const angularFrequency = 2 * Math.PI * f1;
        let wt = angularFrequency * currentTime;
        data.push(amplitude * Math.sin(wt));
      }
      else {
        const angularFrequency = 2 * Math.PI * f2;
        let wt = angularFrequency * currentTime;
        data.push(amplitude * Math.sin(wt));
      }
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
    const { blocks, block } = this.props;
    const { blockLinkCarrier } = this.state;
    if (nextProps.block.links < nextProps.block.neededLinks) {
      return;
    }
    let nextProps_blockLinkData = findLink("Data", blocks, block.links);
    let nextProps_blockLinkCarrier = findLink("Carrier Wave", blocks, block.links);
    //If there is differences update the state
    if (nextProps_blockLinkCarrier.data !== blockLinkCarrier.data) {
      let data = this.createDataArray(
        nextProps_blockLinkData.data,
        this.props.resolution,
        nextProps_blockLinkCarrier.frequency,
        nextProps_blockLinkCarrier.amplitude
      );
      this.props.updateBlockValue({
        block: this.props.block,
        key: "data",
        value: data,
        indexOfBlock: this.props.indexOfBlock
      });
      this.setState({ data, blockLinkCarrier: nextProps_blockLinkCarrier });
    }
  }
  updateData() {
    const { block } = this.props;
    const { data } = this.state;
    let newData = block.paused ? data : shiftArray(data);
    if (this._ismounted) {
      this.setState(
        {
          data: newData
        },
        () => {
          window.requestAnimationFrame(this.updateData);
        }
      );
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

FSKData.propTypes = {
  block: PropTypes.object,
  updateBlockValue: PropTypes.func,
  dimensions: PropTypes.object,
  resolution: PropTypes.number
};

const mapStateToProps = (state, props) => {
  return {
    blocks: state.mainPage.present.projects[0].blocks,
    clickedBlock: state.mainPage.present.clickedBlock,
    indexOfBlock: selectors.getIndexOfBlockSelector(state, props)
  };
};
export default connect(
  mapStateToProps,
  { updateBlockValue }
)(FSKData);
