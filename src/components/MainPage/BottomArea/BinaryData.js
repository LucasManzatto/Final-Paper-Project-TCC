import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { blockUpdated, updateBlockValue } from '../actions'
import * as selectors from '../selectors'

import { axisRight } from 'd3-axis'
import { Axis } from './axis'
import { Line } from './Line'
import { shiftArray, getScales } from '../utils'

class BinaryData extends React.Component {
  constructor (props) {
    super(props)
    this.updateData = this.updateData.bind(this)
    let data = this.createDataArray()
    props.updateBlockValue({
      block: props.block,
      key: 'data',
      value: data,
      indexOfBlock: props.indexOfBlock
    })
    this.state = { data }
  }

  updateData () {
    const { block } = this.props
    const { data } = this.state
    let newData = _.clone(data)
    if (!block.paused) {
      newData = shiftArray(newData)
    }
    if (this._ismounted) {
      this.setState(
        {
          data: newData
        },
        () => {
          window.requestAnimationFrame(this.updateData)
        }
      )
    }
  }

  createDataArray () {
    const { resolution, block } = this.props
    const dataArray = block.binary
    const totalTime = resolution
    const size = totalTime / dataArray.length
    let index = 0
    let binaryAux = []
    dataArray.forEach(item => {
      for (let i = 0; i < size; i++) {
        binaryAux[index++] = item
      }
    })
    return binaryAux
  }

  componentDidMount () {
    this._ismounted = true
    this.animationId = window.requestAnimationFrame(this.updateData)
  }

  componentWillUnmount () {
    this._ismounted = false
    window.cancelAnimationFrame(this.animationId)
  }
  render () {
    const { dimensions, block, clickedBlock } = this.props
    const { data } = this.state
    const scale = getScales(data, dimensions, block, this.props.resolution)
    return (
      <g>
        <Line
          xScale={scale.xLine}
          yScale={scale.yLine}
          data={data}
          focused={block === clickedBlock}
        />
        <Axis
          style={{ color: 'ffffff' }}
          axis={axisRight}
          tickValues={scale.tickValues}
          scale={scale.yAxis}
        />
      </g>
    )
  }
}
BinaryData.propTypes = {
  block: PropTypes.object,
  blockUpdated: PropTypes.func,
  updateBlockValue: PropTypes.func,
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
  { blockUpdated, updateBlockValue }
)(BinaryData)
