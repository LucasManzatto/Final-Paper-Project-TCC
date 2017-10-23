import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900,blue500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

//Imports dos components do projeto
import Menu from './menu';
import SideBar from './sideBar';
import SideBarBlock from './sideBarBlock';
import ProjectArea from './projectArea';
import BottomArea from './bottomArea';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

//Redux
import {connect} from 'react-redux';
import {initialState} from '../actions/index';

const style={
    paddingTop: 10
}

const styleBottomArea ={
    paddingTop: 10,
    paddingRight: 50,
    position: 'fixed',
    bottom: 10,
    width: '100%'
}


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
  },
  appBar: {
    height: 50,
  },
});


const App = props =>(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Grid fluid>
            <Menu />
            <Row between="xs" style={style}>
                <Col xs={2}>
                    <SideBar/>
                </Col>
                <Col xs={7} className="text-center">
                    <ProjectArea />
                </Col>
                <Col xs={2}>
                    <SideBarBlock />
                </Col>
            </Row>

            <Row middle="xs" style={styleBottomArea}>
                <Col xs="12">
                    <BottomArea />
                </Col>
            </Row>

        </Grid>
    </MuiThemeProvider>);

export default App;
