import React from 'react';

const updateInterval = 1000 / 60;

export const generateData = (totalTime, offset = 1,type,frequency,amplitude) => {
  const data = new Array(totalTime);
  const binary = [1,1,1,1,1,1,-1,1];
  let index = 0;
  let x =0;
  let freq =2*Math.PI*frequency;
  let freq2 =2*Math.PI;
  let currentTime =0;
  let y;

  //Rodar essa funcao para cada elemento do binario?
  for (let i=offset; i<totalTime + offset; i++) {
    currentTime = (i / totalTime);
    x =  freq * currentTime;
    let x2 = freq2 * currentTime;
    if(type === 'sine'){
        y = Math.sin(x);
    }
    else if(type ==='square') {
        //Square wave
        y = Math.sign(Math.sin(x));
        //y = -Math.cos(2*Math.PI*x);
        //y = Math.cos(2*Math.PI*x);
        //BPSK
        // y = Math.cos(2*Math.PI*x);
    }
    else if(type ==='bpsk') {
        if(Math.sign(Math.sin(x2)) > 0){
            y = -Math.cos(x);
        }
        else{
            y = Math.cos(x);
        }
    }
    else{
        y = Math.sin(x);
    }
    data[index] = {
      x,
      y
    }
    index++;
}
  return data;
}

export class SinDataSource extends React.Component {
  constructor(props) {
    super(props)
    this.updateData = this.updateData.bind(this);
    this.state = {
      data: [],
      offset: 1,
    }
  }

  updateData() {
    const {type,frequency,amplitude} = this.props.block;
    const resolution = this.props.resolution;
    const duration = 5000;
    const totalNumberOfUpdates = duration / updateInterval;
    const offsetIncrement = resolution / totalNumberOfUpdates;
    const { offset } = this.state;
    const newOffset = offset + offsetIncrement;
    const data = generateData(resolution, newOffset,type,frequency,amplitude);
    this.setState({
      data,
      offset: newOffset,
    }, () => {
      window.requestAnimationFrame(this.updateData);
    })
  }

  componentDidMount() {
    this.animationId = window.requestAnimationFrame(this.updateData);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationId);
  }

  render() {
    const { children } = this.props;
    const { data } = this.state;

    return children(data)
  }
}
