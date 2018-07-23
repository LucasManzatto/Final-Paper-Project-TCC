import _ from "lodash";
//AWGN +rnorm();
import { scaleLinear } from "d3-scale";

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export const difference = (object, base) => {
	function changes(object, base) {
		return _.transform(object, function(result, value, key) {
			if (!_.isEqual(value, base[key])) {
				result[key] =
					_.isObject(value) && _.isObject(base[key]) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(object, base);
};
/**
 * Find min and max.
 * @param  {Array} dataArray  x axis of array.
 * @param  {Integer} resolution Total time of the function.
 * @return {Object}            Return the min and max.
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
/**
 * Shift the data array to make the movement.
 * @param  {Array} data The data on a certain time.
 * @return {Array}       The shifted data.
 */
export const shiftArray = data => {
	let item = data.shift();
	data.push(item);
	return data;
};
/**
 * Create an array with the total time of the function to draw the xy coordinates.
 * @param  {Integer} totalTime Total time of the function.
 * @return {Array}            Return the array from 0 to totalTime-1.
 */
export const createTimeArray = totalTime => {
	let time = [];
	for (let i = 0; i < totalTime; i++) {
		time.push(i / totalTime);
	}
	return time;
};

/**
 * getScales returns the x,y scale based on the data array to fit the graph.
 * @param  {Array} data       Array to scale the y-line.
 * @param  {Object} dimensions Has width and height properties.
 * @param  {Object} block      Object to set tickValues.
 * @param  {Integer} resolution Variable to scale the x-line.
 * @param  {Integer} [amplitude]  Variable to set tickValues.
 * @return {Object}            Return the scales.
 */
export const getScales = (data, dimensions, block, resolution, amplitude) => {
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
	if (block.name === "Data") {
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
 * Hide all unwanted properties of the block.
 * @param  {string} key The checked key.
 * @return {boolean}     Return true or false.
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
		key !== "data" &&
		key !== "requiredLinks"
	) {
		return true;
	}
	return false;
};
/**
 * The binary array uses -1 to 1 to match the BPSK equation, this change all -1
 * to 1.
 * @param  {Array} data The binary array.
 * @return {Array}      Return the array with 0 and 1.
 */
export const valueToBinary = data => {
	return data.map(number => (number === 1 ? 1 : 0));
};
