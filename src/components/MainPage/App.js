import React from 'react';

//Imports dos components do projeto
import Menu from './Menu';
import SideBar from './SideBar/sideBar';
import SideBarBlock from './SideBar/sideBarBlock';
import ProjectArea from './ProjectArea/projectArea';
import BottomArea from './BottomArea/bottomArea';

import { Grid, Row, Col } from 'react-flexbox-grid';
import KeyHandler, {KEYPRESS} from 'react-key-handler';
import {deleteLink} from './actions';

import {connect} from 'react-redux';
import { ActionCreators } from 'redux-undo';
import Pie from './BottomArea/Pie';

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
        <KeyHandler keyEventName={KEYPRESS} keyValue="x" onKeyHandle={() => props.deleteLink()} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="z" onKeyHandle={() => props.undo()} />
        <Menu />
        <Row between="xs" style={style}>
            <Col xs={2}>
                <SideBar/>
            </Col>
            <Col xs={7} className="text-center">
                <ProjectArea/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteLink: () => {dispatch(deleteLink())},
    undo: () => {dispatch(ActionCreators.undo())}
  }
}

export default connect(null,mapDispatchToProps)(App)
