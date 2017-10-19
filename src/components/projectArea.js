import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';

const style={
    height: 680
}
const ProjectArea = () =>(
    <Tabs>
        <Tab label="Projeto 1" >
            <Card style={style}>
            </Card>
        </Tab>
        <Tab label="Projeto 2" >
            <Card style={style}>
            </Card>
        </Tab>
        <Tab label="Projeto 3" >
            <Card style={style}>
            </Card>
        </Tab>
    </Tabs>

);
export default ProjectArea;
