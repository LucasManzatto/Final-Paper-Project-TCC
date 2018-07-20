import React from "react";
import Dimensions from "react-dimensions";

import BinaryData from "./BinaryData";
import BPSKData from "./BPSKData";
import AWGNData from "./AWGNData";
import CarrierWaveData from "./CarrierWaveData";
import Pie from "./Pie";

const BlockCard = props => {
  const component = new React.Component(props);
  let tickValues;
  let paddingxAxis = 30;
  let paddingyAxis = 20;

  component.render = () => {
    const { block } = component.props;
    let data;
    let width = component.props.containerWidth;
    let height = component.props.containerHeight;
    const maxHeight = 870;
    if (height > maxHeight) {
      height = maxHeight;
    }
    if (block.name == "Binary Generator") {
      data = (
        <BinaryData
          width={width}
          height={height}
          resolution={1200}
          block={block}
        />
      );
    }
    if (block.name == "Carrier Wave") {
      data = (
        <CarrierWaveData
          width={width}
          height={height}
          resolution={1200}
          block={block}
        />
      );
    }
    if (block.name == "BPSK") {
      data = (
        <BPSKData
          width={width}
          height={height}
          resolution={1200}
          block={block}
        />
      );
    }
    if (block.name == "AWGN") {
      data = (
        <AWGNData
          width={width}
          height={height}
          resolution={1200}
          block={block}
        />
      );
    }
    return (
      <svg height={height} width={width}>
        {data}
      </svg>
    );
  };
  return component;
};

export default Dimensions()(BlockCard);
