import React from 'react';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid';

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
