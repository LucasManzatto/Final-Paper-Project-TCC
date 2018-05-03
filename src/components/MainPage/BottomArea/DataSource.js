import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {createSineArray,createAwgnArray,createBpskArray,createBinaryArray,createQPSKBinaryArray} from '../utils';
import {blockUpdated} from '../actions';

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

    createDataArray(props) {
        const {resolution,block,blocks} = props;
        let dataY = [];
        switch(block.type){
            case 'square':
                dataY = createBinaryArray(block.binary,resolution);
                break;
            case 'sine':
                dataY = createSineArray(resolution,block.frequency,block.amplitude);
                break;
            case 'bpsk':
                let binaryArray = createBinaryArray(blocks[block.links[0]].binary,resolution);
                dataY= createBpskArray(binaryArray,resolution,blocks[block.links[1]].frequency,blocks[block.links[1]].amplitude);
                break;
            case 'awgn':
                let linkedBlock = this.props.blocks[block.links[0]];
                let awgnBinaryArray = createBinaryArray(blocks[linkedBlock.links[0]].binary,resolution);
                let bpskArray= createBpskArray(awgnBinaryArray,resolution,blocks[linkedBlock.links[1]].frequency,blocks[linkedBlock.links[1]].amplitude);
                dataY = createAwgnArray(bpskArray);
                break;
            default:
                return dataY;
        }
        return dataY;
    }

    componentWillReceiveProps(nextProps){
        //Checa se houve mudança no bloco, se houve dá o update, senão continua a execução normal
        if(nextProps.block.name === 'Carrier Wave' && nextProps.block.updated){
            this.props.blockUpdated({block:this.props.blocks[2],updated:true})
            this.props.blockUpdated({block:this.props.blocks[3],updated:true})
        }
        if(nextProps.block.updated){
            let dataY = this.createDataArray(nextProps);
            this.setState({
              dataY
            })
            this.props.blockUpdated({block:this.props.block,updated:false})
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
        blocks: state.mainPage.present.projects[state.mainPage.present.currentProject].blocks
    }
}
export default connect(mapStateToProps,{blockUpdated})(DataSource)
