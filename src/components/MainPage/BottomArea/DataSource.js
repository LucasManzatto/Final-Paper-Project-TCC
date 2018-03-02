import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

//AWGN +rnorm();
import {rnorm} from 'randgen';
class DataSource extends React.Component {
  constructor(props) {
    super(props)
    this.updateData = this.updateData.bind(this);
    let dataY = this.createDataArray(props);
    this.state = {
      data: [],
      dataY
    }
  }

  updateData() {
    const {block} = this.props;
    const {dataY} = this.state;
    let data = this.createXYArray(dataY);
    //mudando o state sem dar o setState
    if(!block.paused){
        this.shiftArray(dataY);
    }
    this.setState({
      data,
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
  createXYArray(array){
      let data=[];
      array.forEach((item,index)=>{
          data.push({
              x:index,
              y: item
          });
      })
      return data;
  }

  createBinaryArray(binaryArray,totalTime){
      const size = totalTime/binaryArray.length;
      let index=0;
      let binaryAux = [];
      binaryArray.forEach(item=>{
          for(let i =0 ; i<size; i++){
              binaryAux[index++] =item;
      }});
      return binaryAux;
  }

  createBpskArray(binaryArray,totalTime,frequency){
        let data=[];
        const angularFrequency =2*Math.PI*frequency;
        for(let i=0;i<totalTime;i++){
            let currentTime = (i / totalTime);
            let xAxis =  angularFrequency * currentTime;
            if(binaryArray[i] === 0){
                data[i] = -Math.cos(xAxis);
            }
            else{
                data[i] = Math.cos(xAxis);
            }
        }
        return data;
  }

  createAwgnArray(bpskArray){
        let awgnArray = [];
        bpskArray.forEach((item,index)=>{
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


    createDataArray(props) {
        const {resolution,block,blocks} = props;
        let dataY = [];
        switch(block.type){
            case 'square':
                dataY = this.createBinaryArray(block.binary,resolution);
                break;
            case 'sine':
                dataY = this.createSineArray(resolution,block.frequency);
                break;
            case 'bpsk':
                let binaryArray = this.createBinaryArray(blocks[block.source].binary,resolution);
                dataY= this.createBpskArray(binaryArray,resolution,blocks[block.carrierWave].frequency);
                break;
            case 'awgn':
                //array = this.createAwgnArray(sineArray);
                break;
            default:
                return dataY;
        }
        return dataY;
    }

    componentWillReceiveProps(nextProps){
        //Checa se houve mudança no bloco, se houve dá o update, senão continua a execução normal
        if((this.props.block !== nextProps.block) || nextProps.block.type === 'bpsk'){
            let dataY = this.createDataArray(nextProps);
            this.setState({
              dataY
            })
        }
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
const mapStateToProps = state =>{
    return {
        blocks: state.mainPage.projects[state.mainPage.currentProject].blocks
    }
}
export default connect(mapStateToProps,{})(DataSource)
