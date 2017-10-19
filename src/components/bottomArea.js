import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import BlockCard from './BlockCard';

const style={
    height :150,
}
const BottomArea = () =>(
    <Paper zDepth={1} style={style}>
        <Row around="xs" middle="xs" style={style}>
            <Col xs={3}>
                <BlockCard title="Bloco 1"/>
            </Col>
            <Col xs={3}>
                <BlockCard title="Bloco 2"/>
            </Col>
            <Col xs={3}>
                <BlockCard title="Bloco 3"/>
            </Col>
        </Row>
    </Paper>
);
export default BottomArea;
