import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

//Imports dos components do projeto
import Menu from './menu.js';
import SideBar from './sideBar.js';
import SideBarBlock from './sideBarBlock.js';
import ProjectArea from './projectArea.js';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

const style = {
  height: 500,
  width: 1000,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const App = () =>(
    <MuiThemeProvider>
        <Grid fluid>
            <Menu />
            <Row>
                <Col xs={2}>
                    <SideBar />
                </Col>
                <Col xs={8} className="text-center">
                    <ProjectArea />
                </Col>
                <Col xs={2}>
                    <SideBarBlock />
                </Col>
            </Row>
        </Grid>
    </MuiThemeProvider>
    );
export default App;
