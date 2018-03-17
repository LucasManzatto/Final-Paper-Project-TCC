import React from 'react';
import Dimensions from 'react-dimensions';
import _ from 'lodash';

import { scaleLinear } from 'd3-scale'
//import { axisBottom, axisLeft } from 'd3-axis'
//import { Axis } from './Axis'
import DataSource from './DataSource';
import { Line } from './Line'

const BlockCard = props =>{
    const component = new React.Component(props);
    console.log(component.props);
    let padding = 10;

    component.render = () =>{
        let width = component.props.containerWidth;
        let height = component.props.containerHeight;
        // if(height >170){
        //     height =500;
        // }
        return(
            <svg height={height} width={width}>
                <DataSource resolution={2400} block={component.props.block}>{
                    (data) => {
                        //padding = props.block.amplitude;
                        const { minX, maxX, minY, maxY } = findMinMax(data);
                        const xScale = scaleLinear()
                        .domain([minX.toFixed(2), maxX.toFixed(2)])
                        .range([padding, width - padding])

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
                </DataSource>
            </svg>
        );
    }
    return component;
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

export default Dimensions()(BlockCard);
