import React from 'react';

//Imports dos components do projeto
import Menu from './Menu';
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

const App = props =>(
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
            <Col xs={12}>
                <BottomArea />
            </Col>
        </Row>
    </Grid>);

export default App;
