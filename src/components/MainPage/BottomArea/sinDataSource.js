import React from 'react'
import _ from 'lodash';

const updateInterval = 1000 / 60

export const generateData = (totalTime, offset = 1,type) => {
  const data = new Array(totalTime);
  const binary = [1,1,1,1,1,1,-1,1];
  let index = 0;
  let x =0;
  let frequency =2*Math.PI;
  let period = 2;
  let currentTime =0;
  let y;

  //Rodar essa funcao para cada elemento do binario?
  for (let i=offset; i<totalTime + offset; i++) {
    currentTime = (i / totalTime);
    x =  frequency * currentTime;
    if(type === 'sine'){
        y = Math.sin(x);
    }
    else {
        //Square wave
        y = Math.sign(Math.sin(x));
        //y = -Math.cos(2*Math.PI*x);
        //y = Math.cos(2*Math.PI*x);
        //BPSK
        // y = Math.cos(2*Math.PI*x);
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
    this.updateData = this.updateData.bind(this)
    this.state = {
      data: [],
      offset: 1,
    }
  }

  updateData() {
    const { resolution ,type} = this.props
    const duration = 5000
    const totalNumberOfUpdates = duration / updateInterval
    const offsetIncrement = resolution / totalNumberOfUpdates
    const { offset } = this.state
    const newOffset = offset + offsetIncrement
    const data = generateData(resolution, newOffset,type)
    this.setState({
      data,
      offset: newOffset,
    }, () => {
      window.requestAnimationFrame(this.updateData)
    })
  }

  componentDidMount() {
    this.animationId = window.requestAnimationFrame(this.updateData)
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationId)
  }

  render() {
    const { children } = this.props
    const { data } = this.state

    return children(data)
  }
}
