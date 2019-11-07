import React, { useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateBlockData } from '../../actions'
import * as selectors from '../../selectors'
import usePrevious from '../../../../hooks/UsePrevious'
import { axisRight } from 'd3-axis'
import { Axis } from '../axis'
import { Line } from '../line'
import { shiftArray, getScales } from '../../utils'

const createDataArray = (resolution, binaryArray) => {
  const totalTime = resolution
  const size = totalTime / binaryArray.length
  let index = 0
  let binaryAux = []
  binaryArray.forEach(item => {
    for (let i = 0; i < size; i++) {
      binaryAux[index++] = item
    }
  })
  return binaryAux
}

const BinaryData = props => {
  const oldProps = usePrevious(props)
  const { resolution, block, dimensions, updateBlockData } = props
  const binaryData = createDataArray(resolution, block.binary)
  const scale = getScales(binaryData, dimensions, block.name, resolution)

  const [data, setData] = useState(binaryData)

  const requestRef = useRef()

  const animate = () => {
    if (!block.paused) {
      setData(prevData => shiftArray(prevData));
    }
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (oldProps) {
      const oldBinaryData = oldProps.block.binary
      if (oldBinaryData !== block.binary) {
        const newData = createDataArray(resolution, block.binary)
        setData(newData)
        updateBlockData({ id: block.id, data: newData })
      }
    }
    else {
      updateBlockData({ id: block.id, data: binaryData })
    }
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [block.binary])

  return <g>
    <Line
      xScale={scale.xLine}
      yScale={scale.yLine}
      data={data}
    />
    <Axis axis={axisRight} tickValues={scale.tickValues} scale={scale.yAxis} />
  </g>
}
BinaryData.propTypes = {
  block: PropTypes.object,
  updateBlockData: PropTypes.func,
  dimensions: PropTypes.object,
  resolution: PropTypes.number
}
const mapStateToProps = (state, props) => {
  return {
    clickedBlock: state.mainPage.present.clickedBlock,
    indexOfBlock: selectors.getIndexOfBlockSelector(state, props)
  }
}
export default connect(
  mapStateToProps,
  { updateBlockData }
)(BinaryData)
