import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {blockUpdated,updateBlockValue} from '../actions';

import { scaleLinear } from 'd3-scale'
import {axisRight } from 'd3-axis'
import { Axis } from './axis'
import {Line} from './Line';
import {findMinMax} from '../utils';

class BPSKData extends React.Component {

    constructor(props) {
        super(props)
        this.updateData = this.updateData.bind(this);
        const dataLink1 = props.blocks[props.block.links[0]].data;
        const blockLink2 = props.blocks[props.block.links[1]];
        let dataY = this.createDataArray(dataLink1,props.resolution,blockLink2.frequency,blockLink2.amplitude);
        props.updateBlockValue({id: props.block.id,key:'data',value:dataY});
        this.state = {
          data: [],
          dataY,
          blockLink2
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

    createDataArray=(binaryArray,totalTime,frequency,amplitude)=>{
            let data=[];
            const angularFrequency =2*Math.PI*frequency;
            for(let i=0;i<totalTime;i++){
                let currentTime = (i / totalTime);
                let wt =  angularFrequency * currentTime;
                if(binaryArray[i] === 0){
                    data[i] = -amplitude*Math.cos(wt);
                }
                else{
                    data[i] = amplitude*Math.cos(wt);
                }
            }
            return data;
      }

    componentDidMount() {
        this.animationId = window.requestAnimationFrame(this.updateData);
    }

    componentWillUnmount(){
        window.cancelAnimationFrame(this.animationId);
    }
    getScales = (data,height,width,block) =>{
        const amplitude = this.state.blockLink2.amplitude;
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
            .domain([-amplitude/2, amplitude/2])
            .range([height - paddingyAxis, paddingyAxis])
            scale.tickValues= [-amplitude/2,0,amplitude/2];
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
        blocks: state.mainPage.present.projects[0].blocks
    }
}
export default connect(mapStateToProps,{blockUpdated,updateBlockValue})(BPSKData)
