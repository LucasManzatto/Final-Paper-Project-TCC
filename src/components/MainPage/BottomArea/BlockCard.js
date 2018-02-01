import React from 'react';

import { scaleLinear } from 'd3-scale'
//import { axisBottom, axisLeft } from 'd3-axis'
//import { Axis } from './axis'
import { SinDataSource } from './sinDataSource';
import { Line } from './line'
import { findMinMax } from './find-min-max'

const width = 300;
const height = 170;
let padding = 10;

const CardBlock = props =>{
    return(
        <svg width={width} height={height}>
            <SinDataSource resolution={1000} block={props.block}>{
                (data) => {
                    padding = props.block.amplitude;
                    const { minX, maxX, minY, maxY } = findMinMax(data);
                    const xScale = scaleLinear()
                    .domain([minX.toFixed(2), maxX.toFixed(2)])
                    .range([padding, width - padding])

                    const yScale = scaleLinear()
                    .domain([minY.toFixed(2), maxY.toFixed(2)])
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
export default CardBlock;
