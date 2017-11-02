import React from 'react';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid';
import BlockCard from './BlockCard';
import {blue500} from 'material-ui/styles/colors';

const style={
    height :200,
}
const data = {
  labels: ['1', '2', '3', '4', '5', '6', '7'],
  datasets: [
    {
        cubicInterpolationMode : 'monotone',
        //steppedLine : true,
        label: "Bloco 1",
        backgroundColor : 'white',
        borderColor: blue500,
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [0, 3.14, 0, 3.14, 0, 3.14, 0]
    }
  ]
};
const data2 = {
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
        data: [0, 3.14, 0, 3.14, 0, 3.14, 0]
    }
  ]
};

const BottomArea = () =>(
    <Paper zDepth={1} style={style}>
        <Row around="xs" middle="xs" style={style}>
            <Col xs={3}>
                <BlockCard data={data2}/>
            </Col>
            <Col xs={3}>
                <BlockCard data={data}/>
            </Col>
            <Col xs={3}>
                <BlockCard data={data}/>
            </Col>
        </Row>
    </Paper>
);
export default BottomArea;
