import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const style={
    textAlign : 'center'
}

const CardBlock = props =>(
    <Card>
        <CardHeader title={props.title}/>
        <CardText> Gráfico </CardText>
    </Card>
);
export default CardBlock;
