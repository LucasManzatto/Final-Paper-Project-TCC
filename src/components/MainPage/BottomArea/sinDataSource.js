import React from 'react';

export const generateData = (totalTime, offset = 1,block) => {
  const data = new Array(totalTime);
  const binary = [1,-1,1,-1,1,1,-1,1];
  let index = 0;
  let x =0;

  let angularFrequency =2*Math.PI*(block.frequency);
  let freq2 =2*Math.PI*6;
  let currentTime =0;
  let y;
  let size = (totalTime + offset)/binary.length;
  let counter=0;
  //Rodar essa funcao para cada elemento do binario?
  for (let i=offset; i<totalTime + offset; i++) {
    currentTime = (i / totalTime);
    x =  angularFrequency * currentTime;
    if(block.type === 'sine'){
        y = Math.sin(x);
    }
    else if(block.type ==='square') {
        y = Math.sign(Math.sin(x));
    }
    else if(block.type ==='bpsk') {
        let z =  freq2 * currentTime;
        if(Math.sin(z) > 0){
            y = -Math.cos(z);
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
    const {resolution,block} = this.props;
    const duration = 5000;
    const updateInterval = 1000 / 60;
    // 5000/33.33=150
    const totalNumberOfUpdates = duration / updateInterval;
    // 1000/150 = 6.66
    const offsetIncrement = resolution / totalNumberOfUpdates;
    const newOffset = this.state.offset + offsetIncrement;
    const data = generateData(resolution, newOffset,block);
    this.setState({
      data,
      offset: newOffset,
    });
    window.requestAnimationFrame(this.updateData);
  }

  componentDidMount() {
    this.animationId = window.requestAnimationFrame(this.updateData);
  }

  render() {
    const { children } = this.props;
    const { data } = this.state;

    return children(data)
  }
}
