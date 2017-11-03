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
        label: "Bloco 2",
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
        //steppedLine : true,
        pointRadius : 0,
        label: "Bloco 1",
        backgroundColor : 'white',
        borderColor: blue500,
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: []
    }
  ]
};
const data3 = {
  labels: ['0', '', '2π', '', '4π', '', '6π'],
  datasets: [
    {
        cubicInterpolationMode : 'monotone',
        //steppedLine : true,
        label: "Bloco 2",
        backgroundColor : 'white',
        borderColor: blue500,
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [0, 3.14,0, 3.14, 0, 3.14, 0]
    }
  ]
};

const sinWave = freq =>{
    data2.datasets[0].data = [];
    data2.labels = [];
    let counter = 0;
    // 100 iterations
    let increase = Math.PI * 2 / 100;

    for(let i = 0; i <= freq; i += 0.01 ) {
      let x = i;
      let y = Math.sin( counter );
      let position = {x,y};
      data2.datasets[0].data.push(position);
      data2.labels.push('');
      counter += increase;
    }
}

const squareWave = () =>{
    for (let i = 0; i <= 10; i += 1 ) {
        let x = i;
        let y = 5;
    }
}


const BottomArea = props =>{
    sinWave(props.clickedBlock.Frequency);
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
    return{
        clickedBlock : state.app.clickedBlock
    }
}

export default connect(mapStateToProps,null)(BottomArea);
