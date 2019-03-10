import _ from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { Axis } from "./axis";
import { axisRight } from "d3-axis";
import { updateBlockValue } from "../actions";
import { Line } from "./Line";
import { shiftArray, createTimeArray, getScales, difference } from "../utils";
import * as selectors from "../selectors";

class BPSKData extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    const { blocks, block, resolution } = props;
    let data = [];
    //Para entrar aqui deve ter os 2 links, data e Carrier
    //os dois podem estar na posicao 0 ou 1, entao deve selecionar o correto

    let blockLinkData = this.findLink("Data", blocks, block.links);
    let blockLinkCarrier = this.findLink("Carrier Wave", blocks, block.links);
    data = this.createDataArray(blockLinkData.data, resolution, blockLinkCarrier);
    props.updateBlockValue({
      block: props.block,
      key: "data",
      value: data,
      indexOfBlock: props.indexOfBlock
    });
    this.state = {
      data,
      blockLinkData,
      blockLinkCarrier
    };
  }
  findLink = (linkName, blocks, links) => {
    return _.clone(
      _.find(
        blocks,
        block => (block.id === links[0] || block.id === links[1]) && block.name === linkName
      )
    );
  };

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

  // componentDidUpdate(prevProps){
  //   const { blocks, block } = this.props;
  //   const { blockLinkCarrier } = this.state;
  //   let blockLinkData = this.findLink("Data", blocks, block.links);
  //   let blockLinkCarrier = this.findLink("Carrier Wave", blocks, block.links);


  //   if(blockLinkData.data !== this.state.blockLinkData.data){
  //     console.log("entrou")
  //     let data = this.createDataArray(blockLinkData.data);
  //     this.props.updateBlockValue({
  //       block: this.props.block,
  //       key: "data",
  //       value: data,
  //       indexOfBlock: this.props.indexOfBlock
  //     });
  //   this.setState({ data, blockLinkData});
  //   }
  // }
  componentWillReceiveProps(nextProps) {
    const { blocks, block } = this.props;
    const { blockLinkCarrier } = this.state;
    if (nextProps.block.links < nextProps.block.neededLinks) {
      return;
    }
    let nextProps_blockLinkData = this.findLink("Data", blocks, block.links);
    let nextProps_blockLinkCarrier = this.findLink("Carrier Wave", blocks, block.links);
    
    if (nextProps_blockLinkCarrier.data !== blockLinkCarrier.data) {
      let data = this.createDataArray(
        nextProps_blockLinkData.data,
        this.props.resolution,
        nextProps_blockLinkCarrier
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
)(BPSKData);
