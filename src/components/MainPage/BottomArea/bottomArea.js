import React from "react";

import Paper from "material-ui/Paper";
import Button from "material-ui/Button";

import { Row, Col } from "react-flexbox-grid";
import BlockCard from "./BlockCard";
import _ from "lodash";

import { connect } from "react-redux";
import { pauseBlock } from "../actions";
import ExpandBlockCard from "./ExpandedBlockCard";
const style = {
	height: 200
};

const BottomArea = props => {
	const renderBlockCards = _.map(props.blocks, block => {
		//Se o total de link for diferente de 0 e o bloco não estiver linkado ele nao é renderizado
		if (block.neededLinks !== 0 && !block.linked) {
			return;
		}
		return (
			<Col xs={3} key={block.id} style={{ height: "100%", textAlign: "center", paddingBottom: 30 }}>
				<Row start="xs">
					<Col xs={6}>
						<Button color="primary" onClick={event => props.pauseBlock({ block })}>
							{block.paused ? <div>Resume</div> : <div>Pause</div>}
						</Button>
					</Col>
					<Col xs={6}>
						<ExpandBlockCard block={block} />
					</Col>
				</Row>
				<BlockCard block={block} key={block.id} />
			</Col>
		);
	});

	return (
		<Paper style={style}>
			<Row start="xs" middle="xs" style={style}>
				{renderBlockCards}
			</Row>
		</Paper>
	);
};

const mapStateToProps = state => {
	return {
		blocks: state.mainPage.present.projects[state.mainPage.present.currentProject].blocks
	};
};

export default connect(
	mapStateToProps,
	{ pauseBlock }
)(BottomArea);
