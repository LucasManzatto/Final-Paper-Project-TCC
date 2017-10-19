import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';

const ProjectArea = () =>(
    <Tabs>
        <Tab label="Projeto 1" >
            <Card>
            <CardHeader
              title="Without Avatar"    
              subtitle="Subtitle"
            />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>
        </Tab>
        <Tab label="Projeto 2" >
        </Tab>
        <Tab label="Projeto 3" >
        </Tab>
    </Tabs>

);
export default ProjectArea;
