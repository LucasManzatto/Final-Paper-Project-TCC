import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import * as _ from 'lodash';
//import Subheader from 'material-ui/Subheader';

//redux
import { connect } from 'react-redux';
import { updateBlockValue, updateDropDown } from '../actions';
//import {updateBlockValue} from '../SideBar/actions';

const style = {
	fontWeight: 'bold'
};
const ID = () => {
	return '_' + Math.random().toString(36).substr(2, 9);
};

const renderRequiredLinks = (requiredLinks) => _.map(requiredLinks, (link, index) => {
	return link === 'None' ? (
		<Typography key={ID()}>{link}</Typography>
	) : (
			<Typography key={ID()}>{link} :</Typography>
		);
});

const SideBarBlock = (props) => {
	if (props.clickedBlock === undefined) {
		return <Paper elevation={0} square={true} key={0} style={{ height: '100%', paddingTop: 16 }}>
			<Typography variant="title" gutterBottom align="center">
				Block Details
			</Typography>
		</Paper>
	}
	return (
		<Paper elevation={0} square={true} key={props.clickedBlock.id} style={{ height: '100%', paddingTop: 16 }}>
			<Typography variant="title" gutterBottom align="center">
				{props.clickedBlock ? props.clickedBlock.name : "Block Details"}
			</Typography>
			<List>
				<ListItem>
					<ListItemText
						style={style}
						primary={
							<Fragment>
								<Typography variant="body1">{props.clickedBlock.description}</Typography>
								<p />
								{!_.isEmpty(props.clickedBlock) && (
									<Typography variant="subheading" gutterBottom align="center">
										<b>Required Links</b>
									</Typography>
								)}
								{props.clickedBlock && renderRequiredLinks(props.requiredLinks)}
							</Fragment>
						}
					/>
				</ListItem>
			</List>
		</Paper>
	);
};

const mapStateToProps = (state) => {
	return {
		clickedBlock: state.mainPage.present.userState.clickedBlock
	};
};
export default connect(mapStateToProps, { updateBlockValue, updateDropDown })(SideBarBlock);
