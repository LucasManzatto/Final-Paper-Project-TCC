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
    const data = {
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [
        {
            cubicInterpolationMode : 'monotone',
            //steppedLine : true,
            label: props.title,
            backgroundColor : 'white',
            borderColor: blue500,
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [0, 3.14, 0, 3.14, 0, 3.14, 0]
        }
      ]
    };

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
