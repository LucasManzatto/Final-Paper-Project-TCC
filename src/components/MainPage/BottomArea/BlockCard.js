import React from 'react';
import Dimensions from 'react-dimensions';


import { scaleLinear } from 'd3-scale'
import {axisRight } from 'd3-axis'
import { Axis } from './axis'
import DataSource from './DataSource';
import { Line } from './Line'
import {findMinMax} from '../utils';

const BlockCard = props =>{
    const component = new React.Component(props);
    let tickCount =2;
    let paddingxAxis = 30;
    let paddingyAxis =20;

    component.render = () =>{
        const {block} = component.props;
        let width = component.props.containerWidth;
        let height = component.props.containerHeight;
        const maxHeight = 870;
        if(height >maxHeight){
            height =maxHeight;
        }
        return(
            <svg height={height} width={width}>
                <DataSource resolution={2400} block={block}>{
                    (data) => {
                        //padding = props.block.amplitude;
                        const { minX, maxX, minY, maxY } = findMinMax(data);
                        const xScale = scaleLinear()
                        .domain([minX.toFixed(2), maxX.toFixed(2)])
                        .range([paddingxAxis, width - paddingxAxis])

                        const yScale = scaleLinear()
                        .domain([minY.toFixed(2), maxY.toFixed(2)])
                        .range([height - paddingyAxis, paddingyAxis])
                        return (
                            <g>
                                <Line
                                  xScale={xScale}
                                  yScale={yScale}
                                  data={data}
                                />
                                <Axis
                                    axis={axisRight}
                                    tickCount={tickCount}
                                    scale={yScale}
                                />
                            </g>
                        )
                    }
                }
                </DataSource>
            </svg>
        );
    }
    return component;
}

export default Dimensions()(BlockCard);
