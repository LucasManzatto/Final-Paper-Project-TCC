import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


//Imports dos components do projeto
import Menu from './menu';
import SideBar from './SideBar/sideBar';
import SideBarBlock from './SideBar/sideBarBlock';
import ProjectArea from './ProjectArea/projectArea';
import BottomArea from './BottomArea/bottomArea';

import { Grid, Row, Col } from 'react-flexbox-grid';

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
                <Col     xs={2}>
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
                <Col xs={12}>
                    <BottomArea />
                </Col>
            </Row>
        </Grid>
    </MuiThemeProvider>);

export default App;
