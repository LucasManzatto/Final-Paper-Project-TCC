import React from 'react';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid';
import BlockCard from './BlockCard';
import {blue500} from 'material-ui/styles/colors';
import _ from 'lodash';

import {connect} from 'react-redux';

const style={
    height :200,
}

const data1 = {
  labels: ['1', '2', '3', '4', '5', '6', '7'],
  datasets: [
    {
        //cubicInterpolationMode : 'monotone',
        steppedLine : true,
        label: "Random Number Generator",
        backgroundColor : 'white',
        borderColor: blue500,
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [0, 1, 0, 1, 0, 1, 0]
    }
  ]
};
let data2 = {
  labels: [],
  datasets: [
    {
        cubicInterpolationMode : 'monotone',
        pointRadius : 0,
        label: "Carrier Wave",
        backgroundColor : 'white',
        borderColor: blue500,
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: []
    }
  ]
};
let data3 = {
  labels: [],
  datasets: [
    {
        cubicInterpolationMode : 'monotone',
        pointRadius : 0,
        label: "BPSK",
        backgroundColor : 'white',
        borderColor: blue500,
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: []
    }
  ]
};

const sinWave = (freq,data) =>{
    data.datasets[0].data = [];
    data.labels = [];
    let counter = 0;
    // 100 iterations
    let increase = Math.PI * 2 / 100;

    for(let i = 0; i <= freq; i += 0.01 ) {
      let x = i;
      let y = Math.sin( counter );
      let position = {x,y};
      data.datasets[0].data.push(position);
      data.labels.push('');
      counter += increase;
    }
}

const drawChart = block =>{
    return (
        <Col xs={3}>
            <BlockCard data={data2}/>
        </Col>
    );
}

const BottomArea = props =>{
    console.log(props);
    sinWave(props.blocks.block1.Frequency,data2);
    sinWave(props.blocks.block2.Frequency,data3);
    return(
        <Paper zDepth={1} style={style}>
            <Row around="xs" middle="xs" style={style}>
                <Col xs={3}>
                    <BlockCard data={data1}/>
                </Col>
                <Col xs={3}>
                    <BlockCard data={data2}/>
                </Col>
                <Col xs={3}>
                    <BlockCard data={data3}/>
                </Col>
            </Row>
        </Paper>
    );
}

const mapStateToProps = state =>{
    const project = state.app.projects.byId.project1;
    console.log(state);
    return{
        project,
        blocks : state.app.blocks.byId
    }
}

export default connect(mapStateToProps,null)(BottomArea);
