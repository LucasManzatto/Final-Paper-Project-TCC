import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {blockUpdated,updateBlockValue} from '../actions';

import { scaleLinear } from 'd3-scale'
import {axisRight } from 'd3-axis'
import { Axis } from './axis'
import {Line} from './Line';
import {findMinMax,findMinMax2} from '../utils';

class CarrierWaveData extends React.Component {

    constructor(props) {
        super(props)
        this.updateData = this.updateData.bind(this);
        const {resolution,block} = this.props;
        let data = this.createDataArray(resolution,block.frequency,block.amplitude);
        let dataX = this.createFillerData();
        props.updateBlockValue({id: block.id,key:'data',value:data});
        this.state = {data,dataX}
    }


    updateData() {
        const {block} = this.props;
        const {data} = this.state;
        let new_data = _.clone(data);
        if(!block.paused){
            new_data = this.shiftArray(new_data);
        }
        this.setState({
            data:new_data,
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
    createFillerData(){
      let data=[];
      for(let i=0;i<this.props.resolution;i++){
        data.push(i);
      }
      return data;
    }
    createTimeArray(resolution){
      let time=[];
      for(let i =0; i<resolution;i++){
        time.push(i/resolution);
      }
      return time;
    }

    createDataArray(totalTime,frequency,amplitude){
        let data=[];
        let time = this.createTimeArray(totalTime);
        const angularFrequency =2*Math.PI*frequency;
        for(let currentTime in time){
          let wt = angularFrequency * time[currentTime];
          data.push(amplitude * Math.sin(wt));
        }
        return data;
    }
    updateDataArray = (totalTime,frequency,amplitude,old_frequency,oldAmplitude,data) =>{
        let newData=[];
        const angularFrequency =2*Math.PI*frequency;
        const old_angularFrequency= 2*Math.PI*old_frequency;
        // console.log(2/totalTime);
        // console.log(angularFrequency * (2/totalTime));
        // let test = amplitude * Math.sin(angularFrequency * (2/totalTime))
        // console.log(test);
        // console.log(Math.asin(test/amplitude)/angularFrequency);
        for(let i=0;i<totalTime;i++){
          let currentTime = (i / totalTime);
          let old_currentTime = Math.asin((data[i]/amplitude))/old_angularFrequency;
          let old_wt = old_angularFrequency * old_currentTime;
          let wt =  angularFrequency * currentTime;
          newData[i]= (data[i]/Math.sin(old_wt))*Math.sin(wt);
        }
        return newData;
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


    componentDidMount() {
        this.animationId = window.requestAnimationFrame(this.updateData);
    }

    componentWillUnmount(){
        window.cancelAnimationFrame(this.animationId);
    }
    componentWillReceiveProps(nextProps){
        const {resolution,block} = nextProps;
        if(block.updated){
            let dataY = this.updateDataArray(resolution,block.frequency,block.amplitude,this.props.block.frequency,this.props.block.amplitude,this.state.dataY);
            this.props.updateBlockValue({id: block.id,key:'data',value:dataY});
            this.props.blockUpdated({block,updated:false})
            this.setState({
                dataY
            })
        }
    }
    getScales = (data,height,width,block) =>{
        let tickValues;
        let scale ={
            xLine : [],
            yLine : [],
            yAxis: [],
            tickValues :0
        };
        //let new_data = createFullArray(data);
        let paddingxAxis = 30;
        let paddingyAxis =20;
        const { minX, maxX, minY, maxY } = findMinMax2(data,this.props.resolution);
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
        const {data,dataX} = this.state;
        const scale = this.getScales(data,height,width,block);
        return (
            <g>
                <Line
                  xScale={scale.xLine}
                  yScale={scale.yLine}
                  data={{data:{x:dataX,y:data}}}
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
export default connect(mapStateToProps,{blockUpdated,updateBlockValue})(CarrierWaveData)
