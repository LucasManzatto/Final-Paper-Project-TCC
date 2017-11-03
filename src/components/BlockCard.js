import React from 'react';
import {Card, CardHeader, CardText,CardMedia} from 'material-ui/Card';
import {Bar,Line} from 'react-chartjs-2';
import {blue500} from 'material-ui/styles/colors';

const chartStyle = {
    height :50,
    width:450
}

const style = {
    textAlign : 'right'
}

const CardBlock = props =>{
    return(
    <Card>
        <CardMedia >
            <Line
             data={props.data}
             width={100}
             height={150}
             options={{
               maintainAspectRatio: false,
             }}
            />
        </CardMedia>
    </Card>
    );
}
export default CardBlock;
