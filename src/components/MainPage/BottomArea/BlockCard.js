import React from 'react';
import Dimensions from 'react-dimensions';


import { scaleLinear } from 'd3-scale'
import {axisRight } from 'd3-axis'
import { Axis } from './axis'
import DataSource from './DataSource';
import {Line} from './Line';
import {findMinMax} from '../utils';

const BlockCard = props =>{
    const component = new React.Component(props);
    let tickValues;
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
                <DataSource resolution={1200} block={block}>{
                    (data) => {
                        //padding = props.block.amplitude;
                        const { minX, maxX, minY, maxY } = findMinMax(data);
                        const xScale = scaleLinear()
                        .domain([minX.toFixed(2), maxX.toFixed(2)])
                        .range([paddingxAxis, width - paddingxAxis])

                        const yScale = scaleLinear()
                        .domain([minY.toFixed(2), maxY.toFixed(2)])
                        .range([height - paddingyAxis, paddingyAxis])

                        let yScaleAxis;
                        if(block.id===0){
                            yScaleAxis = scaleLinear()
                            .domain([0, 1])
                            .range([height - paddingyAxis, paddingyAxis])
                            tickValues= [-1,0,1];
                        }
                        else{
                            yScaleAxis = scaleLinear()
                            .domain([-component.props.amplitude/2, component.props.amplitude/2])
                            .range([height - paddingyAxis, paddingyAxis])
                            tickValues= [-component.props.amplitude/2,0,component.props.amplitude/2];
                        }

                        return (
                            <g>
                                <Line
                                  xScale={xScale}
                                  yScale={yScale}
                                  data={data}
                                />
                                <Axis
                                    axis={axisRight}
                                    tickValues={tickValues}
                                    scale={yScaleAxis}
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
