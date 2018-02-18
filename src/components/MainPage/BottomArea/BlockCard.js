import React from 'react';
import _ from 'lodash';

import { scaleLinear } from 'd3-scale'
//import { axisBottom, axisLeft } from 'd3-axis'
//import { Axis } from './axis'
import { SinDataSource } from './sinDataSource';
import { Line } from './line'

const width = 300;
const height = 170;
let padding = 10;

const CardBlock = props =>{
    return(
        <svg width={width} height={height}>
            <SinDataSource resolution={100} block={props.block}>{
                (data) => {
                    //padding = props.block.amplitude;
                    const { minX, maxX, minY, maxY } = findMinMax(data);
                    const xScale = scaleLinear()
                    .domain([minX.toFixed(2), maxX.toFixed(2)])
                    .range([padding, width])

                    const yScale = scaleLinear()
                    .domain([minY, maxY])
                    .range([height - padding, padding])

                    return (
                        <Line
                          xScale={xScale}
                          yScale={yScale}
                          data={data}
                        />
                    )
                }
            }
            </SinDataSource>
        </svg>
    );
}
const findMinMax = dataArray => {
  let minX = Number.MAX_SAFE_INTEGER,
      maxX = Number.MIN_SAFE_INTEGER,
      minY = Number.MAX_SAFE_INTEGER,
      maxY = Number.MIN_SAFE_INTEGER

    _.map(dataArray,data=>{
        if (data.x < minX) {
            minX = data.x;}
        else if (data.x > maxX) {
            maxX = data.x;
        }

        if (data.y < minY) {
            minY = data.y;}
        else if (data.y > maxY) {
            maxY = data.y;
        }
    })

  return {minX,maxX,minY,maxY};
}

export default CardBlock;
