import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
//import Subheader from 'material-ui/Subheader';

//redux
import { connect } from "react-redux";
import { updateBlockValue, updateDropDown } from "../actions";
//import {updateBlockValue} from '../SideBar/actions';

const style = {
	fontWeight: "bold"
};

const SideBarBlock = props => {
	const renderRequiredLinks = props.clickedBlock.requiredLinks.map((link, index) => {
		return link === "None" ? <Typography>{link}</Typography> : <Typography>{link} :</Typography>;
	});
	return (
		<Paper style={{ height: "100%" }}>
			<Typography variant="title" gutterBottom align="center">
				{props.clickedBlock.name}
			</Typography>
			<List>
				<ListItem>
					<ListItemText
						style={style}
						primary={
							<Fragment>
								<Typography variant="body1">{props.clickedBlock.description}</Typography>
								<p />
								<Typography variant="subheading" gutterBottom align="center">
									<b>Required Links</b>
								</Typography>
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

const mapStateToProps = state => {
	return {
		clickedBlock: state.mainPage.present.clickedBlock
	};
};
export default connect(
	mapStateToProps,
	{ updateBlockValue, updateDropDown }
)(SideBarBlock);
