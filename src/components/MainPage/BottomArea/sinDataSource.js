import React from 'react';
import _ from 'lodash';

export const generateData = (totalTime,block,binary,sineArray) => {
    const data = new Array(totalTime);
    let size = totalTime/binary.length;

    let index = 0;
    let xAxis;
    let counterSine = 0;
    let binaryCounter=0;

    const angularFrequency =2*Math.PI*(block.frequency);

    if(block.type === 'square'){
        binary.map(item =>{
            for(let i =0 ; i<size; i++){
                data[index] = {
                    x:index++,
                    y: item
                }
            }
        })
    }

    if(block.type === 'sine' || block.type === 'bpsk'){
        sineArray.map(item =>{
            let currentTime = (counterSine / totalTime);
            xAxis =  angularFrequency * currentTime;
            //counterSine++;
            data[counterSine++] = {
                x:xAxis,
                y: item
            }
        })
    }

    //BPSK
    //yAxis = -Math.cos(z);
    //yAxis = Math.cos(xAxis);
    return data;
}

export class SinDataSource extends React.Component {
  constructor(props) {
    super(props)
    this.updateData = this.updateData.bind(this);
    const binary = [-1,-1,0,0,-1,0,0,-1,-1,0,-1,-1,0,0,0,-1,-1];
    const size = props.resolution/binary.length;
    let counter=0;
    let binaryAux = [];
    binary.map(item=>{
        for(let i =0 ; i<size; i++){
            binaryAux[counter++] =item;
    }});

    const sineArray = this.createSineArray(props.resolution);
    this.state = {
      data: [],
      binary : binaryAux,
      sineArray
    }
  }
  //Se passar a data da square wave pro redux, tem como
  //usar no bpsk pra calcular quando é 0 e 1
  updateData() {
    const {resolution,block} = this.props;
    const {binary,offset,sineArray} = this.state;
    const data = generateData(resolution,block,binary,sineArray);

    this.shiftArray(binary);
    this.shiftArray(sineArray);


    this.setState({
      data,
      binary,
      sineArray
    });
    window.requestAnimationFrame(this.updateData);

  }
  //tira o primeiro elemento e coloca no final do array;
  shiftArray(array){
      let item = array.shift();
      array.push(item);
  }

  createBinaryArray(binaryArray){

  }

  createSineArray(totalTime){
      const array =[];
      const angularFrequency =2*Math.PI*(this.props.block.frequency);
      for(let i=0;i<totalTime;i++){
          let currentTime = (i / totalTime);
          let xAxis =  angularFrequency * currentTime;
          array[i] = Math.sin(xAxis);
      }
      return array;
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
