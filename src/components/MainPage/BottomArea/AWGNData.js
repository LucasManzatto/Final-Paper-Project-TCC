import _ from "lodash";
import { Axis } from "./axis";
import { axisRight } from "d3-axis";
import { blockUpdated, updateBlockValue } from "../actions";
import { connect } from "react-redux";
import { Line } from "./Line";
import { rnorm } from "randgen";
import { shiftArray, getScales } from "../utils";
import PropTypes from "prop-types";
import React from "react";
import * as selectors from "../selectors";

class AWGNData extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    const blockLinkData = _.clone(props.linkedBlocks[0]);
    const data = this.createDataArray(blockLinkData.data);
    props.updateBlockValue({
      block: props.block,
      key: "data",
      value: data,
      indexOfBlock: props.indexOfBlock
    });
    this.state = {
      data,
      blockLinkData
    };
  }

  createDataArray = data => {
    let awgnArray = [];
    if(!_.isEmpty(data)){
      data.forEach(item => {
        awgnArray.push(item + rnorm());
      });
    }
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
  
  componentDidUpdate(prevProps){
      const blockLinkData = prevProps.linkedBlocks[0];
      if(blockLinkData.data !== this.state.blockLinkData.data){
        console.log("entrou")
        let data = this.createDataArray(blockLinkData.data);
        this.props.updateBlockValue({
          block: this.props.block,
          key: "data",
          value: data,
          indexOfBlock: this.props.indexOfBlock
        });
      this.setState({ data, blockLinkData});
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
    let amplitude = 1;
    if ("amplitude" in blockLinkData) amplitude = blockLinkData.amplitude;
    const scale = getScales(data, dimensions, block, this.props.resolution, amplitude);
    return (
      <g>
        <Line
          xScale={scale.xLine}
          yScale={scale.yLine}
          data={data}
          //focused={block === clickedBlock ? true : false}
        />
        <Axis axis={axisRight} tickValues={scale.tickValues} scale={scale.yAxis} />
      </g>
    );
  }
}
AWGNData.propTypes = {
  block: PropTypes.object,
  blockUpdated: PropTypes.func,
  dimensions: PropTypes.object,
  resolution: PropTypes.number,
  updateBlockValue: PropTypes.func
};
const mapStateToProps = (state, props) => {
  return {
    blocks: state.mainPage.present.projects[0].blocks,
    clickedBlock: state.mainPage.present.clickedBlock,
    linkedBlocks: selectors.linkedBlocksSelector(state, props),
    indexOfBlock: selectors.getIndexOfBlockSelector(state, props)
  };
};
export default connect(
  mapStateToProps,
  { blockUpdated, updateBlockValue }
)(AWGNData);
