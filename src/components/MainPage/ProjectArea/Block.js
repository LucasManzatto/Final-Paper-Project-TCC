import _ from 'lodash';
import { Line } from 'react-lineto';
import Draggable from 'react-draggable';
import Grid from '@material-ui/core/Grid';
import Left from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Right from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';

import { notHidden, valueToBinary } from '../utils';
import * as selectors from '../selectors';

//redux
import { connect } from 'react-redux';
import * as actions from '../actions';

const blockHeight = 100;
const blockWidth = 160;
const blockStyle = {
	height: blockHeight,
	width: blockWidth,
	borderStyle : 'solid',
	borderWidth : '1px 0px 1px 1px',
	borderColor: '#77a6f7',
	backgroundColor: '#d3e3fc',
	zIndex: 2
};
const closeStyle = {
	height: blockHeight,
	borderStyle : 'solid',
	borderWidth : '1px 1px 1px 0px',
	borderColor: '#77a6f7',
	backgroundColor: '#d3e3fc',
	zIndex: 2
}
const blockStyleLeft = {
	height: 33,
	//  borderTop: "1px solid black",
	//	borderRight: "1px solid black",
	//borderLeft: "1px solid black",
	//  borderBottom: "1px solid black",
	backgroundColor: '#00887a'
};
const blockStyleRight = {
	height: 33,
	//  borderTop: "1px solid black",
	//  borderRight: "1px solid black",
	//borderLeft: "1px solid black",
	//  borderBottom: "1px solid black",
	backgroundColor: '#77a6f7'
};
const iconStyle = {
	position: 'relative',
	top: '7px'
};

class Block extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projectTabOffset: 0,
			offsetX: 0,
			offsetY: 0,
			mouseClicked: false,
			position: 5,
			blockPosition: props.block.position
		};
	}
	componentDidMount = () => {
		this.props.blockClicked(this.props.block);
		this.calculateOffset('projectTab');
	};

	calculateOffset = (element) => {
		let projectTabOffset = document.getElementsByClassName(element)[0].getBoundingClientRect();
		let offsetX = window.pageXOffset + projectTabOffset.left;
		let offsetY = window.pageYOffset + projectTabOffset.top;
		this.setState({
			projectTabOffset,
			offsetX,
			offsetY
		});
	};

	getBounds = () => ({
		left: 0,
		top: 0,
		right: this.state.projectTabOffset.width - blockWidth - (this.props.block.neededLinks === 0 ? 16 : 32),
		bottom: this.state.projectTabOffset.height - blockHeight
	});

	getPosition(bounds) {
		let { position } = this.props.block;
		if (position.x > bounds.right) {
			position.x = bounds.right;
		}
		if (position.y > bounds.bottom) {
			position.y = bounds.bottom;
		}
		return position;
	}

	handleClick = () => {
		if (this.props.block !== this.props.clickedBlock) {
			this.props.blockClicked(this.props.block);
		}
	};

	handleDrag = (e, ui) => {
		const { x, y } = this.props.block.position;
		const deltaPosition = {
			x: x + ui.deltaX,
			y: y + ui.deltaY
		};
		this.props.moveBlock({
			value: deltaPosition,
			block: this.props.block,
			indexOfBlock: this.props.indexOfBlock
		});
	};

	linkBlocks = (position) => {
		const { blocksToLinkArray, block } = this.props;
		this.setState({ position });
		//Can link only from the input to the output and cannot link fully linked blocks
		//Need to check if a block is already fully linked but other block wants to link with
		//it in the output
		//Nao deixar linkar quando o bloco que voce quer linkar nao esta linkado e nao tem Data
		if (
			(position === 195 && (blocksToLinkArray.length === 0 || block.data.length === 0)) ||
			(block.links.length > block.neededLinks && block.neededLinks !== 0)
		) {
			return;
		} else {
			if (!this.blocksToLinkArrayIsFull() && !_.includes(blocksToLinkArray, this.props.block)) {
				this.props.blocksToLink({ block });
			}
		}
	};
	blocksToLinkArrayIsFull = () => this.props.blocksToLinkArray.length >= 2;

	renderLines = () => {
		let { selectLink, block, projects, selectedLink, currentProject } = this.props;
		let { offsetX, offsetY } = this.state;

		if (block.neededLinks === 0) {
			return null;
		}
		return block.links.map((linkPosition) => {
			let linkBlock = _.find(projects[currentProject].blocks, (block) => block.id === linkPosition);
			let borderStyle = 'solid';
			if (selectedLink.id === block.id && selectedLink.linkPosition === linkPosition) {
				borderStyle = 'dashed';
			}

			return (
				<div key={linkPosition} onClick={(event) => selectLink({ id: block.id, linkPosition })}>
					<Line
						borderWidth={3}
						borderStyle={borderStyle}
						borderColor="black"
						zIndex={1}
						x0={block.position.x + 8 + offsetX}
						y0={block.position.y + blockHeight / 2 + offsetY}
						x1={linkBlock.position.x + offsetX + 170}
						y1={linkBlock.position.y + blockHeight / 2 + offsetY}
					/>
				</div>
			);
		});
	};

	renderLineToCursor = (position) => {
		let { block, cursorPosition } = this.props;
		let { offsetX, offsetY } = this.state;
		//render line only when the block is not fully linked and is not already linking
		if (this.isLinking(block)) {
			return (
				<Line
					borderWidth={3}
					borderStyle="solid"
					borderColor="black"
					zIndex={1}
					x0={block.position.x + position + offsetX}
					y0={block.position.y + blockHeight / 2 + offsetY}
					x1={cursorPosition.x + offsetX}
					y1={cursorPosition.y + offsetY}
				/>
			);
		} else return null;
	};

	isLinking = (block) => _.includes(this.props.blocksToLinkArray, block);

	showProperties = (block) => {
		return _.map(block, (value, key) => {
			if (key === 'binary') {
				return (
					<Typography key={key} variant="body1">
						<b>{_.capitalize(key)}:</b>
						{valueToBinary(value)}
					</Typography>
				);
			}
			//Hide unwanted properties
			if (notHidden(key)) {
				let sum = 1;
				if (key === 'frequency') {
					sum = 6;
				}
				return (
					<Typography key={key} variant="body1">
						<b>{_.capitalize(key)}:</b>
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
		});
	};

	updateBlockOnClick = (value, key) => {
		this.props.updateBlockValue({
			value,
			key,
			block: this.props.block
		});
		this.props.updateBlockValue({
			value: true,
			key: 'updated',
			block: this.props.block
		});
	};

	render = () => {
		const { block } = this.props;
		const bounds = this.getBounds();
		const position = this.getPosition(bounds);
		return (
			<Fragment>
				<Draggable
					grid={[ 10, 10 ]}
					bounds={bounds}
					onDrag={this.handleDrag}
					// onStop={this.handleStop}
					position={position}
				>
					<Grid
						onClick={this.handleClick}
						container
						style={{ height: 100, width: 192, position: 'absolute', zIndex: 2 }}
					>
						{block.neededLinks === 0 ? null : (
							// INPUT
							<Grid item container direction="column" xs={1} style={{ height: 100 }}>
								<Grid item xs={4} />
								<Grid
									item
									container
									alignItems="center"
									style={blockStyleLeft}
									onClick={() => this.linkBlocks(5)}
								/>
								<Grid item xs={4} />
							</Grid>
						)}
						{/* NAME AND PROPERTIES */}
						<Grid item xs={9} style={blockStyle}>
							<Typography variant="subheading" gutterBottom align="center">
								<b>{block.name}</b>
							</Typography>
							{this.showProperties(block)}
						</Grid>
						{/* DELETE THE BLOCK */}
						<Grid item xs={1} style={closeStyle}>
							<Typography variant="subheading" gutterBottom align="start">
								<button onClick={() => this.props.deleteBlock({block})} style={{all : 'unset'}}>X</button>
							</Typography>
						</Grid>
						{/* OUTPUT */}
						<Grid item container direction="column" xs={1} style={{ height: 100 }}>
							<Grid item xs={4} />
							<Grid
								item
								container
								alignItems="center"
								style={blockStyleRight}
								onClick={() => this.linkBlocks(195)}
							/>
							<Grid item xs={4} />
						</Grid>
					</Grid>
				</Draggable>
				{!_.isNil(block.links) ? this.renderLines() : []}
				{this.renderLineToCursor(this.state.position)}
			</Fragment>
		);
	};
}

Block.propTypes = {
	selectLink: PropTypes.func.isRequired,
	trackLocation: PropTypes.func.isRequired,
	blockClicked: PropTypes.func.isRequired,
	block: PropTypes.object.isRequired,
	dimensions: PropTypes.object.isRequired,
	createLink: PropTypes.func.isRequired,
	blocksToLink: PropTypes.func.isRequired,
	blocksToLinkArray: PropTypes.array.isRequired
};

const mapStateToProps = (state, props) => {
	const { clickedBlock, projects, selectedLink, currentProject, blocksToLinkArray } = state.mainPage.present;

	return {
		clickedBlock,
		projects,
		selectedLink,
		currentProject,
		blocksToLinkArray,
		linkedBlocks: selectors.linkedBlocksSelector(state, props),
		indexOfBlock: selectors.getIndexOfBlockSelector(state, props)
	};
};

export default connect(mapStateToProps, actions)(Block);
