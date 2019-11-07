import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateBlockValue, updateBlockData } from '../../actions'
import * as selectors from '../../selectors'

import { axisRight } from 'd3-axis'
import { Axis } from '../axis'
import { Line } from '../line'
import { shiftArray, createTimeArray, getScales } from '../../utils'

const createDataArray = (totalTime, frequency, amplitude) => {
  let time = createTimeArray(totalTime)
  const angularFrequency = 2 * Math.PI * frequency
  return time.map(currentTime => {
    let wt = angularFrequency * currentTime
    return amplitude * Math.sin(wt)
  })
}

const CarrierWaveData = props => {
  const { resolution, block, dimensions, updateBlockData } = props
  const { frequency, amplitude } = block
  const [data, setData] = useState([])
  const scale = getScales(data, dimensions, block.name, resolution, amplitude)
  const requestRef = useRef()

  const animate = () => {
    if (!block.paused) {
      setData(prevData => shiftArray(prevData));
    }
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const newData = createDataArray(resolution, block.frequency, block.amplitude)
    setData(newData)
    updateBlockData({ id: block.id, data: newData })
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [frequency, amplitude])

  return <g>
    <Line
      xScale={scale.xLine}
      yScale={scale.yLine}
      data={data}
    />
    <Axis axis={axisRight} tickValues={scale.tickValues} scale={scale.yAxis} />
  </g>
}

CarrierWaveData.propTypes = {
  block: PropTypes.object,
  updateBlockValue: PropTypes.func,
  dimensions: PropTypes.object,
  resolution: PropTypes.number
}
const mapStateToProps = (state, props) => {
  return {
    blocks: selectors.projectBlocksSelector(state),
  }
}
export default connect(
  mapStateToProps,
  { updateBlockValue, updateBlockData }
)(CarrierWaveData)
