import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {blockUpdated,updateBlockValue} from '../actions';

import { scaleLinear } from 'd3-scale'
import {axisRight } from 'd3-axis'
import { Axis } from './axis'
import {Line} from './Line';
import {findMinMax} from '../utils';

class BinaryData extends React.Component {

    constructor(props) {
        super(props)
        this.updateData = this.updateData.bind(this);
        let dataY = this.createDataArray(props);
        props.updateBlockValue({id: props.block.id,key:'data',value:dataY});
        this.state = {
          data: [],
          dataY,
        }
    }

    updateData() {
        const {block} = this.props;
        const {dataY} = this.state;
        let data = this.createFullArray(dataY);

        let new_dataY = _.clone(dataY);
        if(!block.paused){
            new_dataY = this.shiftArray(new_dataY);
        }
        this.setState({
            data,
            dataY: new_dataY
            }, () =>{
                window.requestAnimationFrame(this.updateData);
            });
        }

        //tira o primeiro elemento e coloca no final do array;
    shiftArray(array){
      let item = array.shift();
      array.push(item);
      return array;
    }
    createFullArray(array){
      let data=[];
      array.forEach((item,index)=>{
          data.push({
              x:index,
              y: item
          });
      })
      return data;
    }

    createDataArray() {
        const {resolution,block} = this.props;
        const dataArray = block.binary;
        const totalTime = resolution;
        const size = totalTime/dataArray.length;
        let index=0;
        let binaryAux = [];
        dataArray.forEach(item=>{
            for(let i =0 ; i<size; i++){
                binaryAux[index++] =item;
        }});
        return binaryAux;
    }

    componentDidMount() {
        this.animationId = window.requestAnimationFrame(this.updateData);
    }

    componentWillUnmount(){
        window.cancelAnimationFrame(this.animationId);
    }
    getScales = (data,height,width,block) =>{
        let tickValues;
        let scale ={
            xLine :0,
            yLine :0,
            yAxis :0,
            tickValues :0
        };
        let paddingxAxis = 30;
        let paddingyAxis =20;
        const { minX, maxX, minY, maxY } = findMinMax(data);

        scale.xLine = scaleLinear()
        .domain([minX.toFixed(2), maxX.toFixed(2)])
        .range([paddingxAxis, width - paddingxAxis])

        scale.yLine = scaleLinear()
        .domain([minY.toFixed(2), maxY.toFixed(2)])
        .range([height - paddingyAxis, paddingyAxis])

        //Binary Block
        if(block.id===0){
            scale.yAxis = scaleLinear()
            .domain([0, 1])
            .range([height - paddingyAxis, paddingyAxis])
            scale.tickValues= [-1,0,1];
        }
        else{
            scale.yAxis = scaleLinear()
            .domain([-block.amplitude/2, block.amplitude/2])
            .range([height - paddingyAxis, paddingyAxis])
            scale.tickValues= [-block.amplitude/2,0,block.amplitude/2];
        }
        return scale;
    }

    render() {
        const {height,width,block} = this.props;
        const {data} = this.state;
        const scale = this.getScales(data,height,width,block);
        return (
            <g>
                <Line
                  xScale={scale.xLine}
                  yScale={scale.yLine}
                  data={data}
                />
                <Axis
                    axis={axisRight}
                    tickValues={scale.tickValues}
                    scale={scale.yAxis}
                />
            </g>
        )
    }
    }
const mapStateToProps = state =>{
    return {
        state
    }
}
export default connect(mapStateToProps,{blockUpdated,updateBlockValue})(BinaryData)
