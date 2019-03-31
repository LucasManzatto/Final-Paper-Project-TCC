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

const SideBarBlock = (props) => {
	const renderRequiredLinks = _.map(props.clickedBlock.requiredLinks, (link, index) => {
		console.log(link);
		return link === 'None' ? (
			<Typography key={ID()}>{link}</Typography>
		) : (
			<Typography key={ID()}>{link} :</Typography>
		);
	});
	return (
		<Paper elevation={0} square={true} key={props.clickedBlock.id} style={{ height: '100%', paddingTop: 16 }}>
			{_.isEmpty(props.clickedBlock) ? (
				<Typography variant="title" gutterBottom align="center">
					Block Details
				</Typography>
			) : (
				<Typography variant="title" gutterBottom align="center">
					{props.clickedBlock.name}
				</Typography>
			)}
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
								{renderRequiredLinks}
							</Fragment>
						}
					/>
				</ListItem>
				{/* <ListItem>
                    <ListItemText
                      primary="Formula:"
                    />
                </ListItem> */}
			</List>
		</Paper>
	);
};

const mapStateToProps = (state) => {
	return {
		clickedBlock: state.mainPage.present.clickedBlock
	};
};
export default connect(mapStateToProps, { updateBlockValue, updateDropDown })(SideBarBlock);
