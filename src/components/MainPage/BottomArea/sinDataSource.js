import React from 'react';

export const generateData = (totalTime, offset = 1,block) => {
  const data = new Array(totalTime);
  const binary = [1,-1,1,-1,1,1,-1,1];
  const size = (totalTime + offset)/binary.length;

  let index = 0;
  let xAxis;
  let yAxis;


  const angularFrequency =2*Math.PI*(block.frequency);
  let freq2 =2*Math.PI*6;
  let currentTime =0;

  //Rodar essa funcao para cada elemento do binario?
  //i ao total time é sempre o mesmo valor(totalTime);
  //No totalTime é calculado
  for (let i=offset; i<totalTime + offset; i++) {
    currentTime = (i / totalTime);
    xAxis =  angularFrequency * currentTime;
    
    if(block.type === 'sine'){
        yAxis = Math.sin(xAxis);
    }
    else if(block.type ==='square') {
        yAxis = Math.sign(Math.sin(xAxis));
    }
    else if(block.type ==='bpsk') {
        let z =  freq2 * currentTime;
        if(Math.sin(z) > 0){
            yAxis = -Math.cos(z);
        }
        else{
            yAxis = Math.cos(xAxis);
        }
    }

    data[index++] = {
      x: xAxis,
      y: yAxis
    }
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
  //Se passar a data da square wave pro redux, tem como
  //usar no bpsk pra calcular quando é 0 e 1
  updateData() {
    const {resolution,block} = this.props;
    const duration = 5000;
    const updateInterval = 1000/30;
    // 5000/16.66=300.12
    const totalNumberOfUpdates = duration / updateInterval;
    // 1000/300.12 = 3.33
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

  componentWillUnmount(){
      window.cancelAnimationFrame(this.animationId);
  }


  render() {
    const { children } = this.props;
    const { data } = this.state;

    return children(data)
  }
}
