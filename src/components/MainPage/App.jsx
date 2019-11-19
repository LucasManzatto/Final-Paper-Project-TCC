/* eslint-disable no-unused-vars */
import React, { useEffect, use, useState } from 'react';
// Imports dos components do projeto
import { Redirect, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import BottomArea from './BottomArea/BottomArea';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import ProjectArea from './ProjectArea/ProjectArea';
import _ from 'lodash';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography'

import Menu from './Menu';
import SideBar from './SideBar/SideBar';
import SideBarBlock from './SideBar/SideBarBlock';

import * as selectors from './selectors';
import * as actions from './actions';
import KeyHandler, { KEYPRESS } from 'react-key-handler';

import { ActionCreators } from 'redux-undo';
import { connect } from 'react-redux';
import * as firebase from '../../firebase'
import useInterval from '../../hooks/UseInterval'
// import { createDb } from 'C:/Users/Lucas/Documents/GitHub/tcc/src/firebase.js';
const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
});

const App = (props) => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		firebase.init()
		firebase.getUserData()
			.then(data => {
				props.setInitialState(data)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [])

	useInterval(() => {
		firebase.setUserData(props.userState)
	}, 5000)

	if (!isLoading) {
		return (
			<div
				style={{
					paddingRight: 16,
				}}
			>
				<KeyHandler
					keyEventName={KEYPRESS}
					keyValue="q"
					onKeyHandle={() => props.deleteBlock(props.clickedBlock)}
				/>
				<KeyHandler
					keyEventName={KEYPRESS}
					keyValue="x"
					onKeyHandle={() =>
						props.deleteLink({
							block: _.find(props.blocks, (block) => block.id === props.selectedLink.id),
							link: props.selectedLink.linkPosition
						})}
				/>

				<KeyHandler keyEventName={KEYPRESS} keyValue="z" onKeyHandle={() => props.undo()} />
				<CssBaseline />
				<Grid container justify="flex-end" spacing={16}>
					<Grid container item xs={12} spacing={16}>
						<Grid xs item>
							<Menu />
						</Grid>
					</Grid>
					<Grid container item xs={12} spacing={16}>
						<Grid xs={12} sm={3} md={2} item>
							<SideBar />
						</Grid>
						<Grid xs={12} sm={9} md={8} item>
							<ProjectArea />
						</Grid>
						<Hidden smDown>
							<Grid md={2} item>
								<SideBarBlock />
							</Grid>
						</Hidden>
					</Grid>
					<Grid container item xs={12} spacing={16}>
						<Grid xs={12} item style={{ textAlign: 'center' }}>
							<Typography variant="title" color="inherit">
								Block Graphs
          					</Typography>
						</Grid>
						<Grid xs={12} item>
							<BottomArea />
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	} else {
		return <div>Loading...</div>
		// return <Redirect to="/" />;
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		setInitialState: (payload) => {
			dispatch(actions.setInitialState(payload))
		},
		deleteLink: (payload) => {
			dispatch(actions.deleteLink(payload));
		},
		deleteBlock: (clickedBlock) => {
			dispatch(actions.deleteBlock(clickedBlock));
		},
		undo: () => {
			dispatch(ActionCreators.undo());
		}
	};
};
const mapStateToProps = (state) => {
	const userState = selectors.userState(state)
	return {
		userState,
		isAuthenticated: state.mainPage.present.isAuthenticated,
		clickedBlock: userState.clickedBlock,
		selectedLink: userState.selectedLink,
		blocks: selectors.projectBlocksSelector(state)
	};
};

const AppWithStyles = withRouter(withStyles(styles)(App));
const AppWithStylesWithoutRouter = withStyles(styles)(App);

export default connect(mapStateToProps, mapDispatchToProps)(AppWithStylesWithoutRouter);
