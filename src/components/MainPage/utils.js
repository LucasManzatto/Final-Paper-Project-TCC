import _ from "lodash";
//AWGN +rnorm();
import { rnorm } from "randgen";
import { scaleLinear } from "d3-scale";
import { axisRight } from "d3-axis";

/**
 * Find min and max
 * @param  {Array} dataArray  x axis of array
 * @param  {Integer} resolution Total time of the function
 * @return {Object}            Return the min and max
 */
export const findMinMax = (dataArray, resolution) => {
  let minX = 0,
    maxX = resolution - 1,
    minY = Number.MAX_SAFE_INTEGER,
    maxY = Number.MIN_SAFE_INTEGER;

  _.map(dataArray, data => {
    if (data < minY) {
      minY = data;
    } else if (data > maxY) {
      maxY = data;
    }
  });

  return { minX, maxX, minY, maxY };
};
//tira o primeiro elemento e coloca no final do array;
export const shiftArray = array => {
  let item = array.shift();
  array.push(item);
  return array;
};

export const createTimeArray = resolution => {
  let time = [];
  for (let i = 0; i < resolution; i++) {
    time.push(i / resolution);
  }
  return time;
};

/**
 * getScales returns the x,y scale based on the data array to fit the graph
 * @param  {Array} data       description
 * @param  {Object} dimensions description
 * @param  {Object} block      description
 * @param  {Integer} resolution description
 * @param  {Integer} amplitude  description
 * @return {Object}            description
 */
export const getScales = (data, dimensions, block, resolution, amplitude) => {
  let tickValues;
  let scale = {
    xLine: 0,
    yLine: 0,
    yAxis: 0,
    tickValues: 0
  };
  let paddingxAxis = 30;
  let paddingyAxis = 20;
  const { minX, maxX, minY, maxY } = findMinMax(data, resolution);
  scale.xLine = scaleLinear()
    .domain([minX.toFixed(2), maxX.toFixed(2)])
    .range([paddingxAxis, dimensions.width - paddingxAxis]);

  scale.yLine = scaleLinear()
    .domain([minY.toFixed(2), maxY.toFixed(2)])
    .range([dimensions.height - paddingyAxis, paddingyAxis]);

  //Binary Block
  if (block.id === 0) {
    scale.yAxis = scaleLinear()
      .domain([0, 1])
      .range([dimensions.height - paddingyAxis, paddingyAxis]);
    scale.tickValues = [-1, 0, 1];
  } else {
    scale.yAxis = scaleLinear()
      .domain([-amplitude / 2, amplitude / 2])
      .range([dimensions.height - paddingyAxis, paddingyAxis]);
    scale.tickValues = [-amplitude / 2, 0, amplitude / 2];
  }
  return scale;
};
/**
 * Hide all unwanted properties of the block
 * @param  {string} key The checked key
 * @return {boolean}     Return true or false
 */
export const notHidden = key => {
  if (
    key !== "id" &&
    key !== "position" &&
    key !== "type" &&
    key !== "paused" &&
    key !== "name" &&
    key !== "carrierWave" &&
    key !== "source" &&
    key !== "absolutePosition" &&
    key !== "linked" &&
    key !== "samples" &&
    key !== "bpsk" &&
    key !== "links" &&
    key !== "neededLinks" &&
    key !== "updated" &&
    key !== "description" &&
    key !== "data"
  ) {
    return true;
  }
  return false;
};
