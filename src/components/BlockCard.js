import React from 'react';
import {Card,CardMedia} from 'material-ui/Card';
import {Line} from 'react-chartjs-2';
import {blue500} from 'material-ui/styles/colors';


const CardBlock = props =>{
    const component = new React.Component(props);

    const data = {
      labels: [],
      datasets: [
        {
            //cubicInterpolationMode : 'monotone',
            steppedLine : component.props.block.steppedLine,
            label: component.props.block.name,
            backgroundColor : 'white',
            borderColor: blue500,
            borderWidth: 1,
            data: []
        }
      ]
    };


    component.componentDidMount = () =>{
    }
    component.render = () =>{
        if(component.props.block.steppedLine){
            data.labels = [1,2,3,4,5,6,7];
            data.datasets[0].data= [0,1,0,0,1,1,0];
        }
        else{
            data.datasets[0].pointRadius =0;
            sinWave(component.props.block.Frequency,data);
        }
        return(
        <Card>
            <CardMedia >
                <Line
                    data={data}
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
    return component;
}
const sinWave = (freq,data) =>{
    data.datasets[0].data = [];
    data.labels = [];
    let counter = 0;

    let increase = Math.PI * 2 / 100;

    for(let i = 0; i <= freq; i += 0.01 ) {
        let x = i;
        let y = Math.sin(counter) /2 + 0.5;
        let position = {x,y};
        data.datasets[0].data.push(position);
        data.labels.push('');
        counter += increase;
    }
}
export default CardBlock;
