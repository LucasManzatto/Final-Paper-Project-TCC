import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

//AWGN +rnorm();
import {rnorm} from 'randgen';

const generateData = (totalTime,block,binaryArray,sineArray,bpskArray,awgnArray) => {
    let data = [];
    switch(block.type){
        case 'square':
            data = createXYArray(binaryArray);
            break;
        case 'sine':
            data = createXYArray(sineArray);
            break;
        case 'bpsk':
            data = createXYArray(bpskArray);
            break;
        case 'awgn':
            data = createXYArray(awgnArray);
            break;
    }
    return data;
}
const createXYArray = array =>{
    let data=[];
    array.map((item,index)=>{
        data.push({
            x:index,
            y: item
        });
    })
    return data;
}



export default class DataSource extends React.Component {
  constructor(props) {
    super(props)
    this.updateData = this.updateData.bind(this);
    const binary = [0,1,0];
    const binaryArray = this.createBinaryArray(binary,props.resolution);
    const sineArray = this.createSineArray(props.resolution,props.block.frequency);
    const bpskArray = this.createBpskArray(binaryArray,props.resolution);
    const awgnArray = this.createAwgnArray(sineArray);

    this.state = {
      data: [],
      binaryArray,
      sineArray,
      bpskArray,
      awgnArray
    }
  }

  updateData() {
    const {resolution,block} = this.props;
    const {binaryArray,sineArray,bpskArray,awgnArray} = this.state;
    let data = generateData(resolution,block,binaryArray,sineArray,bpskArray,awgnArray);

    //update sem dar setState, errado
    if(!block.paused){
        this.shiftArray(binaryArray);
        this.shiftArray(sineArray);
        this.shiftArray(bpskArray);
        this.shiftArray(awgnArray);
    }
    this.setState({
      data,
    });
    window.requestAnimationFrame(this.updateData);
  }

  //tira o primeiro elemento e coloca no final do array;
  shiftArray(array){
      let item = array.shift();
      array.push(item);
      return array;
  }

  createBinaryArray(binaryArray,totalTime){
      const size = totalTime/binaryArray.length;
      let index=0;
      let binaryAux = [];
      binaryArray.map(item=>{
          for(let i =0 ; i<size; i++){
              binaryAux[index++] =item;
      }});
      return binaryAux;
  }

  createBpskArray(binaryArray,totalTime){
      let data=[];
      const angularFrequency =2*Math.PI*(this.props.block.frequency);
      for(let i=0;i<totalTime;i++){
          let currentTime = (i / totalTime);
          let xAxis =  angularFrequency * currentTime;
          if(binaryArray[i] === 0){
               data[i] = Math.cos(xAxis);
          }
          else{
              data[i] = -Math.cos(xAxis);
          }
      }
      return data;
  }

  createAwgnArray(bpskArray){
      let awgnArray = [];
      bpskArray.map((item,index)=>{
          awgnArray[index] = item + rnorm();
      })
      return awgnArray;
  }


  createSineArray(totalTime,frequency){
      let data=[];
      const angularFrequency =2*Math.PI*frequency;
      for(let i=0;i<totalTime;i++){
          let currentTime = (i / totalTime);
          let xAxis =  angularFrequency * currentTime;
          data[i] = Math.sin(xAxis);
      }
      return data;
  }
  componentWillReceiveProps(nextProps){
      this.props = nextProps;
  }

  componentDidMount() {
    this.animationId = window.requestAnimationFrame(this.updateData);
  }

  componentWillUnmount(){
      window.cancelAnimationFrame(this.animationId);
  }


  render() {
    const { children } = this.props;
    const { data } = this.state;
    return children(data)
  }
}
