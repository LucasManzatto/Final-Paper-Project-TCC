import React from 'react';
import _ from 'lodash';

//AWGN +rnorm();
import {rnorm} from 'randgen';

const generateData = (totalTime,block,binaryArray,sineArray,bpskArray) => {
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



export class SinDataSource extends React.Component {
  constructor(props) {
    super(props)
    this.updateData = this.updateData.bind(this);
    const binary = [0,0,1];

    const binaryArray = this.createBinaryArray(binary,props.resolution);
    const sineArray = this.createSineArray(props.resolution);
    const bpskArray = this.createBpskArray(binaryArray,props.resolution);

    this.state = {
      data: [],
      binaryArray,
      sineArray,
      bpskArray
    }
  }
  //Se passar a data da square wave pro redux, tem como
  //usar no bpsk pra calcular quando é 0 e 1
  updateData() {
    const {resolution,block} = this.props;
    const {binaryArray,offset,sineArray,cosArray,bpskArray} = this.state;
    let data = generateData(resolution,block,binaryArray,sineArray,bpskArray);

    if(!block.paused){
        this.shiftArray(binaryArray);
        this.shiftArray(sineArray);
        this.shiftArray(bpskArray);
    }
    this.setState({
      data,
      binaryArray,
      sineArray,
      bpskArray
    });
    window.requestAnimationFrame(this.updateData);
  }

  //tira o primeiro elemento e coloca no final do array;
  shiftArray(array){
      let item = array.shift();
      array.push(item);
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

  createSineArray(totalTime){
      let data=[];
      const angularFrequency =2*Math.PI*(this.props.block.frequency);
      for(let i=0;i<totalTime;i++){
          let currentTime = (i / totalTime);
          let xAxis =  angularFrequency * currentTime;
          data[i] = Math.sin(xAxis)
      }
      return data;
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
