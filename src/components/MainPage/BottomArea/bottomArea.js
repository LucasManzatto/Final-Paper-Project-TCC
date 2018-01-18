import React from 'react';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid';
import BlockCard from './BlockCard';
import _ from 'lodash';

import {connect} from 'react-redux';
import {blocksSelector} from '../selectors'

import { scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { SinDataSource } from './sinDataSource';
import { Line } from './line'
import { findMinMax } from './find-min-max'
import { Axis } from './axis'

const style={
    height :200,
}
const width = 200;
const height = 170;
const padding = 10;

const BottomArea = props =>{

    const drawCharts = _.map(props.blocks,block =>{
        return (
            <Col key={block.id} xs={3}>
                <BlockCard block={block}/>
            </Col>
        );
    });

    return(
        <Paper zDepth={1} style={style}>
            <Row around="xs" middle="xs" style={style}>
                <svg
                    width={width}
                    height={height}
                >
                    <SinDataSource resolution={100}>{
                        (data) => {
                            const { minX, maxX, minY, maxY } = findMinMax(data)

                            const xScale = scaleLinear()
                            .domain([minX.toFixed(2), maxX.toFixed(2)])
                            .range([padding, width - padding])

                            const yScale = scaleLinear()
                            .domain([minY.toFixed(2), maxY.toFixed(2)])
                            .range([height - padding, padding])

                            return (
                              <g>
                                <Line
                                  xScale={xScale}
                                  yScale={yScale}
                                  data={data}
                                />
                              </g>
                          )
                      }
                }
                  </SinDataSource>
                </svg>
            </Row>
        </Paper>
    );
}

const mapStateToProps = state =>{
    return{
        blocks : blocksSelector(state),
    }
}

export default connect(mapStateToProps)(BottomArea);
