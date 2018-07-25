import React from "react";
import { line, curveLinear } from "d3-shape";
//import simplify from 'simplify-js'

export const Line = props => {
	const { xScale, yScale, data } = props;

	//if there's no data return
	if (!data.length) {
		return null;
	}
	/**
	 * Create an xy array with the data to create the line path.
	 * @param  {Array} data Data of the block.
	 * @return {Array}      Return an xy array.
	 */
	const createFullArray = data => {
		let new_data = [];
		data.forEach((item, index) => {
			new_data.push({ x: index, y: item });
		});
		return new_data;
	};
	let fullData = createFullArray(data);

	//Scale the data to fit the SVG
	fullData.forEach(data => {
		data.x = xScale(data.x);
		data.y = yScale(data.y);
	});

	const lineFunction = line()
		.curve(curveLinear)
		.x(d => d.x)
		.y(d => d.y);
	//const path = lineFunction(simplify(data));
	const path = lineFunction(fullData);

	return <path d={path} style={{ stroke: "#2196f3", strokeWidth: 3, fill: "none" }} />;
};
