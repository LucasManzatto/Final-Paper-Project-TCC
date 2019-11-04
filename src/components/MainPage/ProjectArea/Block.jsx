import _ from 'lodash';
import { Line } from 'react-lineto';
import Draggable from 'react-draggable';
import Grid from '@material-ui/core/Grid';
import Left from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Right from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';

import { notHidden, valueToBinary } from '../utils';
import * as selectors from '../selectors';

//redux
import { connect } from 'react-redux';
import * as actions from '../actions';
import SideBarBlock from '../SideBar/SideBarBlock'

const blockHeight = 100;
const blockWidth = 160;
const blockStyle = {
	borderStyle: 'solid',
	borderWidth: '1px 1px 1px 1px',
	borderColor: '#77a6f7',
	backgroundColor: '#d3e3fc',
	zIndex: 2
};
const blockStyleInput = {
	cursor: 'pointer',
	maxWidth: '100%',
	backgroundColor: '#00887a'
};
const blockStyleOutput = {
	cursor: 'pointer',
	maxWidth: '100%',
	backgroundColor: '#77a6f7'
};
const iconStyle = {
	position: 'relative',
	top: '7px',
	cursor: 'pointer'
};

const blockTopRow = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}

const OUTPUT = 195
const INPUT = 5

class Block extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projectTabOffset: 0,
			offsetX: 0,
			offsetY: 0,
			mouseClicked: false,
			position: 5,
			blockPosition: props.block.position,
			anchorEl: null
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

	handleClick = event => {
		if (this.props.block !== this.props.clickedBlock) {
			this.props.blockClicked(this.props.block);
		}
		if (window.innerWidth < 960) {
			this.setState({
				anchorEl: event.currentTarget,
			})
		}
	};
	handleClose = () => {
		this.setState({
			anchorEl: null,
		});
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
			(position === OUTPUT && (blocksToLinkArray.length === 0 || block.data.length === 0)) ||
			(block.links.length > block.neededLinks && block.neededLinks !== 0)
		) {
			return;
		} else {
			if (!this.blocksToLinkArrayIsFull() && !_.includes(blocksToLinkArray, this.props.block)) {
				this.props.blocksToLink({ block });
			}
		}
	};

	hasInput = block => block.neededLinks ? block.neededLinks > 0 : false

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
					<Typography key={key} variant="body1" style={{ marginLeft: 4 }}>
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
					<Typography key={key} variant="body1" style={{ marginLeft: 4 }}>
						<b>{_.capitalize(key)}:</b>
						<Left
							onClick={() => this.updateBlockOnClick(this.props.block[key] - sum, key)}
							style={iconStyle}
						/>
						{value}
						<Right
							onClick={() => this.updateBlockOnClick(this.props.block[key] + sum, key)}
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
					grid={[10, 10]}
					bounds={bounds}
					onDrag={this.handleDrag}
					// onStop={this.handleStop}
					position={position}
				>
					<Grid
						container
						style={{ height: 100, width: 192, position: 'absolute', zIndex: 2 }}
					>
						{this.hasInput(block) && (
							// INPUT
							<Grid item container direction="column" xs={1}>
								<Grid item xs={4} />
								<Grid
									item
									xs={4}
									style={blockStyleInput}
									onClick={() => this.linkBlocks(INPUT)}
								/>
								<Grid item xs={4} />
							</Grid>
						)}
						{/* NAME AND PROPERTIES */}
						<Grid item container xs={10} style={blockStyle} direction="column">
							{/* BLOCK INFO */}
							<Grid item container xs={3} style={{ maxWidth: '100%' }}>
								<Grid item xs={2} style={blockTopRow}>
									<InfoIcon style={{ fontSize: 'larger', cursor: 'pointer' }} onClick={this.handleClick} />
								</Grid>
								<Grid item xs={8} style={blockTopRow}>
									<Typography variant="subheading" gutterBottom align="center" style={{ margin: '0px' }}>
										<b>{block.name}</b>
									</Typography>
								</Grid>
								{/* DELETE THE BLOCK */}
								<Grid item xs={2} style={blockTopRow}>
									<CloseIcon style={{ fontSize: 'larger', cursor: 'pointer' }} onClick={() => this.props.deleteBlock({ block })} />
								</Grid>
							</Grid>
							<Grid item container xs={9} style={{ maxWidth: '100%' }}>
								{/* BLOCK PROPERTIES */}
								{this.showProperties(block)}
							</Grid>
						</Grid>
						{/* OUTPUT */}
						<Grid item container direction="column" xs={1}>
							<Grid item xs={4} />
							<Grid
								item
								xs={4}
								style={blockStyleOutput}
								onClick={() => this.linkBlocks(OUTPUT)}
							/>
							<Grid item xs={4} />
						</Grid>
						<Popover
							id="simple-popper"
							open={Boolean(this.state.anchorEl)}
							anchorEl={this.state.anchorEl}
							onClose={this.handleClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
						>
							<SideBarBlock />
						</Popover>
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
