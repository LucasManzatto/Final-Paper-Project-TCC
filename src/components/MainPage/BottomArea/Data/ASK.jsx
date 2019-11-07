import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from "react"

import { Axis } from "../axis";
import { axisRight } from "d3-axis";
import { updateBlockData } from "../../actions";
import { Line } from "../line";
import { shiftArray, getScales, findLink, blockTypes } from "../../utils";

const createDataArray = (binaryArray, carrierData, amplitude) => {
  return carrierData.map((value, index) => (binaryArray[index] === -1 ? value : value * (amplitude * 2)) || 0)
}

const getData = (blocks, links) => {
  const binaryData = findLink(blockTypes.DATA, blocks, links).data
  const { amplitude: carrierAmplitude, data: carrierData } = findLink(blockTypes.CARRIER_WAVE, blocks, links)
  return { binaryData, carrierData, carrierAmplitude }
}

const ASKData = props => {
  const { blocks, block, resolution, dimensions } = props
  const { binaryData, carrierData, carrierAmplitude } = getData(blocks, block.links)

  const [data, setData] = useState([])

  const scale = getScales(data, dimensions, block, resolution, carrierAmplitude)

  const requestRef = useRef()

  const animate = () => {
    if (!block.paused) {
      setData(prevData => shiftArray(prevData))
    }
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const newData = createDataArray(binaryData, carrierData)
    setData(newData)
    updateBlockData({ id: block.id, data: newData })
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [carrierData])

  return <g>
    <Line
      xScale={scale.xLine}
      yScale={scale.yLine}
      data={data}
      focused={false}
    />
    <Axis axis={axisRight} tickValues={scale.tickValues} scale={scale.yAxis} />
  </g>
}
ASKData.propTypes = {
  block: PropTypes.object,
  updateBlockData: PropTypes.func,
  dimensions: PropTypes.object,
  resolution: PropTypes.number
};

const mapStateToProps = (state, props) => {
  return {
    blocks: state.mainPage.present.projects[0].blocks,
  };
};
export default connect(
  mapStateToProps,
  { updateBlockData }
)(ASKData);