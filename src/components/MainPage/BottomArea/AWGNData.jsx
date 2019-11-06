import { Axis } from "./axis"
import { axisRight } from "d3-axis"
import { updateBlockData } from "../actions"
import { connect } from "react-redux"
import { Line } from "./line"
import { rnorm } from "randgen"
import { shiftArray, getScales } from "../utils"
import PropTypes from "prop-types"
import React, { useRef, useState, useEffect } from "react"
import * as selectors from "../selectors"
import usePrevious from '../../../hooks/UsePrevious'


const createDataArray = data => data.map(item => item + rnorm())

const AWGNData = props => {
  const oldProps = usePrevious(props)
  const { block, resolution, dimensions, linkedBlocks } = props
  const linkData = linkedBlocks[0].data
  const amplitude = linkData.amplitude || 1
  const [data, setData] = useState(createDataArray(linkData))
  const scale = getScales(data, dimensions, block, resolution, amplitude)

  const requestRef = useRef()

  const animate = () => {
    if (!block.paused) {
      setData(prevData => shiftArray(prevData))
    }
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const { block, updateBlockData } = props
    if (oldProps) {
      const oldLinkData = oldProps.linkedBlocks[0].data
      if (oldLinkData !== linkData) {
        const newData = createDataArray(linkData)
        setData(newData)
        updateBlockData({ id: block.id, data: newData })
      }
    }
    else {
      updateBlockData({ id: block.id, data })
    }
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  })

  return <g>
    <Line
      xScale={scale.xLine}
      yScale={scale.yLine}
      data={data}
    />
    <Axis axis={axisRight} tickValues={scale.tickValues} scale={scale.yAxis} />
  </g>
}

AWGNData.propTypes = {
  block: PropTypes.object,
  dimensions: PropTypes.object,
  resolution: PropTypes.number,
  updateBlockData: PropTypes.func
}
const mapStateToProps = (state, props) => {
  return {
    blocks: state.mainPage.present.projects[0].blocks,
    linkedBlocks: selectors.linkedBlocksSelector(state, props),
  }
}
export default connect(
  mapStateToProps,
  { updateBlockData }
)(AWGNData)
