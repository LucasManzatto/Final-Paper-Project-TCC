import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const CardBlock = props =>{
    return(
    <Card>
        <CardHeader title={props.title}/>
        <CardText> Gráfico </CardText>
    </Card>
    );
}
export default CardBlock;
