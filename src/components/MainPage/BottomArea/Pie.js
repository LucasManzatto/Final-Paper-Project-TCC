import React from 'react';
import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import _ from 'lodash'
import simplify from 'simplify-js'

export default class Pie extends React.Component {
  constructor(props) {
      super(props)
      this.updateData = this.updateData.bind(this);
      let data = this.createDataArray(120,4,2);
      this.state = {data}
  }
  updateData() {
      const {data} = this.state;
      let new_data = _.clone(data);
      new_data = this.shiftArray(new_data);
      this.setState({
          data:new_data,
          }, () =>{
              window.requestAnimationFrame(this.updateData);
          });
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
  shiftArray(array){
    let item = array.shift();
    array.push(item);
    return array;
  }
  componentDidMount() {
    this.animationId = window.requestAnimationFrame(this.updateData);
  }
  componentWillUnmount(){
      window.cancelAnimationFrame(this.animationId);
  }
  render() {
    var data = {
      series: [this.state.data],

    }
    let options = {
      high:2,
      low:-2,
      ticks:[0,1],
      showPoint:false,
      lineSmooth: true//Chartist.Interpolation.step()
    }
    var type = 'Line'

    return (
      <div>
        <ChartistGraph data={data} options={options} type={type} />
      </div>
    )
  }
}
