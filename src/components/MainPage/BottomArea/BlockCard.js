import React from 'react';
import {Card,CardMedia} from 'material-ui/Card';
import {blue500} from 'material-ui/styles/colors';

import { scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { SinDataSource } from './sinDataSource';
import { Line } from './line'
import { findMinMax } from './find-min-max'
import { Axis } from './axis'

const width = 500;
const height = 170;
const padding = 10;

const CardBlock = props =>{
    return(
        <svg width={width} height={height}>
            <SinDataSource resolution={200} type={props.type}>{
                (data) => {
                    const { minX, maxX, minY, maxY } = findMinMax(data)

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
