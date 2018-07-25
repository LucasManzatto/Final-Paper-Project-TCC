import React from "react";
import Draggable from "react-draggable";
import _ from "lodash";
import { Line } from "react-lineto";
import Left from "material-ui-icons/ChevronLeft";
import Right from "material-ui-icons/ChevronRight";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-flexbox-grid";
import orange from "@material-ui/core/colors/orange";
import Typography from "@material-ui/core/Typography";

import { notHidden, valueToBinary } from "../utils";

//redux
import { connect } from "react-redux";
import * as actions from "../actions";

const blockHeight = 100;
const blockWidth = 170;
const blockStyle = {
	height: blockHeight,
	width: blockWidth,
	border: "1px solid black",
	backgroundColor: "#f5f5f5",
	position: "absolute",
	zIndex: 2
};
const blockStyleLeft = {
	height: 33,
	width: 20,
	color: orange,
	borderTop: "1px solid black",
	//	borderRight: "1px solid black",
	borderLeft: "1px solid black",
	borderBottom: "1px solid black",
	backgroundColor: "#ff9100",
	position: "absolute",
	zIndex: 1
};
const blockStyleRight = {
	height: 33,
	width: 20,
	borderTop: "1px solid black",
	borderRight: "1px solid black",
	//borderLeft: "1px solid black",
	borderBottom: "1px solid black",
	backgroundColor: "#2196f3",
	position: "absolute",
	zIndex: 1
};
const iconStyle = {
	position: "relative",
	top: "7px"
};

class Block extends React.Component {
	constructor(props) {
		console.log(props.block);
		super(props);
		this.state = {
			projectTabOffset: 0,
			offsetX: 0,
			offsetY: 0
		};
	}
	renderLines = () => {
		let { mainPage, selectLink, block } = this.props;
		let { offsetX, offsetY } = this.state;
		if (!block.linked) {
			return null;
		}
		return block.links.map(linkPosition => {
			let linkBlock =
				mainPage.present.projects[mainPage.present.currentProject].blocks[linkPosition];
			let borderStyle = "solid";
			if (
				mainPage.present.selectedLink.id === block.id &&
				mainPage.present.selectedLink.linkPosition === linkPosition
			) {
				borderStyle = "dashed";
			}

			return (
				<div key={linkPosition} onClick={event => selectLink({ id: block.id, linkPosition })}>
					<Line
						borderWidth={4}
						borderStyle={borderStyle}
						borderColor="black"
						zIndex={1}
						x0={block.position.x + 5 + offsetX}
						y0={block.position.y + blockHeight / 2 + offsetY}
						x1={linkBlock.position.x + 185 + offsetX}
						y1={linkBlock.position.y + blockHeight / 2 + offsetY}
					/>
				</div>
			);
		});
	};
	showProperties = (value, key) => {
		if (key === "binary") {
			return (
				<Typography key={key} variant="body1">
					{_.capitalize(key)}:
					{valueToBinary(value)}
				</Typography>
			);
		}
		//Hide unwanted properties
		if (notHidden(key)) {
			let sum = 1;
			if (key === "frequency") {
				sum = 6;
			}
			return (
				<Typography key={key} variant="body1">
					{_.capitalize(key)}:
					<Left
						onClick={(event, value) => this.updateBlockOnClick(this.props.block[key] - sum, key)}
						style={iconStyle}
					/>
					{value}
					<Right
						onClick={(event, value) => this.updateBlockOnClick(this.props.block[key] + sum, key)}
						style={iconStyle}
					/>
				</Typography>
			);
		}
	};
	updateBlockOnClick = (value, key) => {
		this.props.updateBlockValue({ value, key, block: this.props.block });
		this.props.blockUpdated({ block: this.props.block, updated: true });
	};

	handleDrag = (e, ui) => {
		this.handleClick();
		const { x, y } = this.props.block.position;
		const deltaPosition = {
			x: x + ui.deltaX,
			y: y + ui.deltaY
		};
		this.props.trackLocation({ block: this.props.block, deltaPosition });
	};

	handleClick = () => {
		if (this.props.block !== this.props.mainPage.present.clickedBlock) {
			this.props.blockClicked(this.props.block);
		}
	};
	calculateOffset = () => {
		let projectTabOffset = document.getElementsByClassName("projectTab")[0].getBoundingClientRect();
		let offsetX = window.pageXOffset + projectTabOffset.left;
		let offsetY = window.pageYOffset + projectTabOffset.top;
		this.setState({
			projectTabOffset,
			offsetX,
			offsetY
		});
	};
	getBounds = () => {
		return {
			left: 0,
			top: 0,
			right: this.state.projectTabOffset.width - blockWidth,
			bottom: this.state.projectTabOffset.height - blockHeight
		};
	};
	getPosition = bounds => {
		let position = {
			x: this.props.block.position.x,
			y: this.props.block.position.y
		};
		if (position.x > bounds.right) {
			position.x = bounds.right;
		}
		if (position.y > bounds.bottom) {
			position.y = bounds.bottom;
		}
		return position;
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.dimensions !== this.props.dimensions) {
			this.renderLines();
		}
		this.calculateOffset();
	};

	componentDidMount = () => {
		this.props.blockClicked(this.props.block);
		this.calculateOffset();
	};
	render = () => {
		const { block } = this.props;
		const bounds = this.getBounds();
		const position = this.getPosition(bounds);
		const offset = block.neededLinks === 0 ? 11 : 10;
		return (
			<Draggable
				//grid={[10, 10]}
				bounds={bounds}
				onDrag={this.handleDrag}
				position={position}>
				<Row
					style={{ height: 100, width: 200, position: "absolute", zIndex: 2 }}
					onClick={this.handleClick}>
					<Col xs={12}>
						<Row>
							{block.neededLinks === 0 ? (
								[]
							) : (
								<Col xs={1} style={{ height: 100 }}>
									<Row style={{ height: 33, width: 20 }} />
									<Row middle="xs" style={blockStyleLeft} onClick={this.handleClick} />
									<Row style={{ height: 33, width: 20 }} />
								</Col>
							)}
							<Col xsOffset={1} xs={10} style={blockStyle}>
								<Typography variant="subheading" gutterBottom align="center">
									<b>{block.name}</b>
								</Typography>
								{_.map(block, this.showProperties)}
								{!_.isNil(block.links) ? this.renderLines() : []}
							</Col>
							<Col xsOffset={offset} xs={1} style={{ height: 100 }}>
								<Row style={{ height: 33, width: 20 }} />
								<Row middle="xs" style={blockStyleRight} onClick={this.handleClick} />
								<Row style={{ height: 33, width: 20 }} />
							</Col>
						</Row>
					</Col>
				</Row>
			</Draggable>
		);
	};
}

Block.propTypes = {
	selectLink: PropTypes.func,
	trackLocation: PropTypes.func,
	blockClicked: PropTypes.func,
	block: PropTypes.object,
	dimensions: PropTypes.object
};

const mapStateToProps = state => {
	return state;
};

export default connect(
	mapStateToProps,
	actions
)(Block);
