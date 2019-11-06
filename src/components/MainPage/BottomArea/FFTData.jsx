// import React from 'react'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import _ from 'lodash'
// import { updateBlockValue } from '../actions'
// import * as selectors from '../selectors'

// import { axisRight } from 'd3-axis'
// import { Axis } from './axis'
// import { Line } from './line'
// import { shiftArray, createTimeArray, getScales } from '../utils'
// import ft from 'fourier-transform';
// import oscillator from 'audio-oscillator'

// class FFTData extends React.Component {
//   constructor (props) {
//     super(props)
//     this.updateData = this.updateData.bind(this)
//     const { resolution, block } = this.props
//     //let data = this.createDataArray(resolution, block.frequency, block.amplitude)
//     let data = createFFT(resolution)
//     props.updateBlockValue({
//       block: props.block,
//       key: 'data',
//       value: data,
//       indexOfBlock: props.indexOfBlock
//     })
//     this.state = { data }
//   }

//   createFFT (resolution) {
//     const fft = ft(oscillator.sine(resolution, 440))
//   }

//   updateData () {
//     const { block } = this.props
//     const { data } = this.state
//     let newData = _.clone(data)
//     if (!block.paused) {
//       newData = shiftArray(newData)
//     }
//     if (this._ismounted) {
//       this.setState(
//         {
//           data: newData
//         },
//         () => {
//           window.requestAnimationFrame(this.updateData)
//         }
//       )
//     }
//   }

//   createDataArray (totalTime, frequency, amplitude) {
//     let data = []
//     let time = createTimeArray(totalTime)
//     const angularFrequency = 2 * Math.PI * frequency
//     time.forEach(currentTime => {
//       let wt = angularFrequency * currentTime
//       data.push(amplitude * Math.sin(wt))
//     })
//     return data
//   }

//   render () {
//     const { dimensions, block, clickedBlock } = this.props
//     const { data } = this.state
//     const scale = getScales(data, dimensions, block, this.props.resolution, block.amplitude)
//     return (
//       <g>
//         <Line
//           xScale={scale.xLine}
//           yScale={scale.yLine}
//           data={data}
//           focused={block === clickedBlock}
//         />
//         <Axis axis={axisRight} tickValues={scale.tickValues} scale={scale.yAxis} />
//       </g>
//     )
//   }
//   componentDidMount () {
//     this._ismounted = true
//     this.animationId = window.requestAnimationFrame(this.updateData)
//   }

//   componentWillUnmount () {
//     this._ismounted = false
//     window.cancelAnimationFrame(this.animationId)
//   }
//   componentWillReceiveProps (nextProps) {
//     const { resolution, block } = nextProps
//     if (block.updated) {
//       let data = this.createDataArray(resolution, block.frequency, block.amplitude)
//       this.props.updateBlockValue({
//         block: this.props.block,
//         key: 'data',
//         value: data,
//         indexOfBlock: this.props.indexOfBlock
//       })
//       this.props.updateBlockValue({
//         block: this.props.block,
//         key: 'updated',
//         value: false,
//         indexOfBlock: this.props.indexOfBlock
//       })
//       this.setState({ data })
//     }
//   }
// }
// FFTData.propTypes = {
//   block: PropTypes.object,
//   updateBlockValue: PropTypes.func,
//   dimensions: PropTypes.object,
//   resolution: PropTypes.number
// }
// const mapStateToProps = (state, props) => {
//   return {
//     blocks: selectors.projectBlocksSelector(state),
//     clickedBlock: state.mainPage.present.clickedBlock,
//     indexOfBlock: selectors.getIndexOfBlockSelector(state, props)
//   }
// }
// export default connect(
//   mapStateToProps,
//   { updateBlockValue }
// )(FFTData)
