import React, { Component } from 'react';
import { CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';

import DragDrop from './DragDrop';



const style={
    height: 680
}
const ProjectArea = () =>(
    <Tabs>
        <Tab label="Projeto 1" >
            <DragDrop>
            </DragDrop>
        </Tab>
        <Tab label="Projeto 2" >
        </Tab>
        <Tab label="Projeto 3" >
        </Tab>
    </Tabs>

);
export default ProjectArea;
