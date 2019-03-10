import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {updateBlockValue } from '../actions'
import * as selectors from '../selectors'

import { axisRight } from 'd3-axis'
import { Axis } from './axis'
import { Line } from './Line'
import { shiftArray, createTimeArray, getScales } from '../utils'

import ft from 'fourier-transform'
import oscillator from 'audio-oscillator'
import * as dsp from 'dsp.js'

class CarrierWaveData extends React.Component {

  constructor (props) {
    super(props)
    this.updateData = this.updateData.bind(this)
    const { resolution, block } = this.props
    let data = this.createDataArray(resolution, block.frequency, block.amplitude)

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

  createDataArray (totalTime, frequency, amplitude) {

    // var bufferSize = totalTime
    // var sampleRate = 44100
    // frequency *= frequency*2
    // var frequency = 344
    // var sine = new dsp.Oscillator(dsp.Oscillator.Sine, frequency, amplitude, bufferSize, sampleRate)
    // sine.generate()
    // var signal = sine.signal
    // let data = [].slice.call(signal)
    // var nthHarmonic = 8
    // let harmonic = new dsp.Oscillator(dsp.Oscillator.Sine, frequency * nthHarmonic, 10 / nthHarmonic, bufferSize, sampleRate);
    // harmonic.generate()
    // sine.add(harmonic)



    //var fft = new dsp.FFT(2048, 44100)
    // var spectrum = fft.spectrum
    //var sampleRate = 44100
    //var lp12 = new dsp.IIRFilter(dsp.DSP.LOWPASS, 22050, 0, sampleRate)
    //lp12.set(2500, 0.3)
    //signal = lp12.func.process(signal)



    let data = []
    let time = createTimeArray(totalTime)
    const angularFrequency = 2 * Math.PI * frequency
    time.forEach(currentTime => {
      let wt = angularFrequency * currentTime
      data.push(amplitude * Math.sin(wt))
    })
    return data
  }

  render () {
    const { dimensions, block, clickedBlock } = this.props
    const { data } = this.state
    const scale = getScales(data, dimensions, block, this.props.resolution, block.amplitude)
    return (
      <g>
        <Line
          xScale={scale.xLine}
          yScale={scale.yLine}
          data={data}
          focused={block === clickedBlock}
        />
        <Axis axis={axisRight} tickValues={scale.tickValues} scale={scale.yAxis} />
      </g>
    )
  }
  componentDidMount () {
    this._ismounted = true
    this.animationId = window.requestAnimationFrame(this.updateData)
  }

  componentWillUnmount () {
    this._ismounted = false
    window.cancelAnimationFrame(this.animationId)
  }
  componentWillReceiveProps (nextProps) {
    const { resolution, block } = nextProps
    if (block.updated) {
      let data = this.createDataArray(resolution, block.frequency, block.amplitude)
      this.props.updateBlockValue({
        block: this.props.block,
        key: 'data',
        value: data,
        indexOfBlock: this.props.indexOfBlock
      })
      this.props.updateBlockValue({
        block: this.props.block,
        key: 'updated',
        value: false,
        indexOfBlock: this.props.indexOfBlock
      })
      this.setState({ data })
    }
  }
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
    clickedBlock: state.mainPage.present.clickedBlock,
    indexOfBlock: selectors.getIndexOfBlockSelector(state, props)
  }
}
export default connect(
  mapStateToProps,
  {updateBlockValue }
)(CarrierWaveData)
