import _ from 'lodash'
// AWGN +rnorm();
import { scaleLinear } from 'd3-scale'
/**
 * Find min and max.
 * @param  {Array} dataArray - x axis of array.
 * @param  {number} resolution - Total time of the function.
 * @return {Object}            Return the min and max.
 */
export const findMinMax = (dataArray, resolution) => {
  let minX = 0

  let maxX = resolution - 1

  let minY = Number.MAX_SAFE_INTEGER

  let maxY = Number.MIN_SAFE_INTEGER

  _.map(dataArray, data => {
    if (data < minY) {
      minY = data
    } else if (data > maxY) {
      maxY = data
    }
  })
  return { minX, maxX, minY, maxY }
}

/**
 * Shift the data array to make the movement.
 * @param  {Array} data The data on a certain time.
 * @return {Array}       The shifted data.
 */
export const shiftArray = data => {
  const clonedData = _.clone(data)
  let item = clonedData.shift()
  clonedData.push(item)
  return clonedData
}

/**
 * Create an array with the total time of the function to draw the xy coordinates.
 * @param  {number} totalTime Total time of the function.
 * @return {Array}            Return the array from 0 to totalTime-1.
 */
export const createTimeArray = totalTime => {
  const totalTimeArray = createTimeArrayWithIndexes(totalTime)
  return totalTimeArray.map(time => time / totalTime)
}

export const createTimeArrayWithIndexes = totalTime => Array(totalTime).fill(null).map((x, i) => i)

/**
 * getScales returns the x,y scale based on the data array to fit the graph.
 * @param  {Array} data       Array to scale the y-line.
 * @param  {Object} dimensions Has width and height properties.
 * @param  {Object} block      Object to set tickValues.
 * @param  {number} resolution Variable to scale the x-line.
 * @param  {number} [amplitude]  Variable to set tickValues.
 * @return {Object}            Return the scales.
 */
export const getScales = (data, dimensions, blockName, resolution, amplitude) => {
  let scale = {
    xLine: 0,
    yLine: 0,
    yAxis: 0,
    tickValues: 0
  }
  let paddingxAxis = 30
  let paddingyAxis = 20
  const { minX, maxX, minY, maxY } = findMinMax(data, resolution)
  scale.xLine = scaleLinear()
    .domain([minX.toFixed(2), maxX.toFixed(2)])
    .range([paddingxAxis, dimensions.width - paddingxAxis])

  scale.yLine = scaleLinear()
    .domain([minY.toFixed(2), maxY.toFixed(2)])
    .range([dimensions.height - paddingyAxis, paddingyAxis])

  // Binary Block
  if (blockName === 'Data') {
    scale.yAxis = scaleLinear()
      .domain([0, 1])
      .range([dimensions.height - paddingyAxis, paddingyAxis])
    scale.tickValues = [-1, 0, 1]
  } else {
    scale.yAxis = scaleLinear()
      .domain([-amplitude / 2, amplitude / 2])
      .range([dimensions.height - paddingyAxis, paddingyAxis])
    scale.tickValues = [-amplitude / 2, 0, amplitude / 2]
  }
  return scale
}

/**
 * The binary array uses -1 to 1 to match the BPSK equation, this change all -1
 * to 1.
 * @param  {Array} data The binary array.
 * @return {Array}      Return the array with 0 and 1.
 */
export const valueToBinary = data => {
  return data.map(number => (number === 1 ? 1 : 0))
}

export const findLink = (linkName, blocks, links) => {
  return _.clone(
    _.find(
      blocks,
      block => (block.id === links[0] || block.id === links[1]) && block.name === linkName
    )
  );
};

export const blockTypes = {
  DATA: 'Data',
  CARRIER_WAVE: 'Carrier Wave',
  BPSS: 'BPSK'
}

export const calculateOffset = (element) => {
  let componentOffset = document.getElementsByClassName(element)[0].getBoundingClientRect()
  let offsetX = window.pageXOffset + componentOffset.left
  let offsetY = window.pageYOffset + componentOffset.top
  return {
    componentOffset,
    offsetX,
    offsetY
  }
}
