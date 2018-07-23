import React from "react";
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
		if (link === "None") {
			return <p key={link}>{link}</p>;
		}
		return <p key={link}>{link} :</p>;
	});
	return (
		<Paper style={{ height: "100%" }}>
			<Typography variant="title" className="title" style={{ textAlign: "center" }}>
				<b>{props.clickedBlock.name}</b>
			</Typography>
			<List>
				<ListItem>
					<ListItemText
						style={style}
						primary={
							<div>
								<div>{props.clickedBlock.description}</div> <p />
								<b>Required Links</b>
								{renderRequiredLinks}
							</div>
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
