import React, { Fragment } from "react";
import Draggable from "react-draggable";
import _ from "lodash";
import { Line } from "react-lineto";
import Left from "@material-ui/icons/ChevronLeft";
import Right from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import KeyHandler, { KEYPRESS } from "react-key-handler";

import { notHidden, valueToBinary } from "../utils";

//redux
import { connect } from "react-redux";
import * as actions from "../actions";

const blockHeight = 100;
const blockWidth = 160;
const blockStyle = {
  height: blockHeight,
  width: blockWidth,
  border: "1px solid",
  borderColor: "#77a6f7",
  backgroundColor: "#d3e3fc",
  zIndex: 2
};
const blockStyleLeft = {
  height: 33,
  //  borderTop: "1px solid black",
  //	borderRight: "1px solid black",
  //borderLeft: "1px solid black",
  //  borderBottom: "1px solid black",
  backgroundColor: "#00887a"
};
const blockStyleRight = {
  height: 33,
  //  borderTop: "1px solid black",
  //  borderRight: "1px solid black",
  //borderLeft: "1px solid black",
  //  borderBottom: "1px solid black",
  backgroundColor: "#77a6f7"
};
const iconStyle = {
  position: "relative",
  top: "7px"
};

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectTabOffset: 0,
      offsetX: 0,
      offsetY: 0,
      mouseClicked: false,
      position: 5
    };
  }

  calculateOffset = element => {
    let projectTabOffset = document.getElementsByClassName(element)[0].getBoundingClientRect();
    let offsetX = window.pageXOffset + projectTabOffset.left;
    let offsetY = window.pageYOffset + projectTabOffset.top;
    this.setState({
      projectTabOffset,
      offsetX,
      offsetY
    });
  };

  componentDidMount = () => {
    this.props.blockClicked(this.props.block);
    this.calculateOffset("projectTab");
  };

  componentWillReceiveProps = nextProps => {
    const blockToLink = nextProps.blocksToLinkArray.find(link => link !== this.props.block.id);
    // if this block is in the blocksToLinkArray and the blocksToLinkArray is full(2)
    // and the blocks are not linked already the create the link
    if (
      nextProps.blocksToLinkArray[0] === this.props.block.id &&
      nextProps.blocksToLinkArray.length === 2 &&
      !_.includes(nextProps.block.links, blockToLink)
    ) {
      //then create the link and delete this block from the blocksToLinkArray
      this.props.createLink({
        block: this.props.block,
        link: blockToLink,
        blocksToLinkArray: nextProps.blocksToLinkArray
      });
      this.props.blocksToLink({
        type: "delete",
        id: this.props.block.id,
        blocksToLinkArray: nextProps.blocksToLinkArray
      });
    }
    if (nextProps.dimensions !== this.props.dimensions) {
      this.renderLines();
    }

    this.calculateOffset("projectTab");
  };

  getBounds = () => ({
    left: 0,
    top: 0,
    right:
      this.state.projectTabOffset.width -
      blockWidth -
      (this.props.block.neededLinks === 0 ? 16 : 32),
    bottom: this.state.projectTabOffset.height - blockHeight
  });

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

  handleClick = () => {
    if (this.props.block !== this.props.clickedBlock) {
      this.props.blockClicked(this.props.block);
    }
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

  linkBlocks = position => {
    this.setState({ position });
    //Can link only from the input to the output.
    if (position === 195 && this.props.blocksToLinkArray.length === 0) {
      return;
    }
    this.props.blocksToLink({
      type: "add",
      id: this.props.block.id,
      blocksToLinkArray: this.props.blocksToLinkArray
    });
  };

  renderLines = () => {
    let { selectLink, block, projects, selectedLink, currentProject } = this.props;
    let { offsetX, offsetY } = this.state;
    if (block.neededLinks === 0) {
      return null;
    }
    return block.links.map(linkPosition => {
      let linkBlock = _.find(projects[currentProject].blocks, block => block.id === linkPosition);
      let borderStyle = "solid";
      if (selectedLink.id === block.id && selectedLink.linkPosition === linkPosition) {
        borderStyle = "dashed";
      }

      return (
        <div key={linkPosition} onClick={event => selectLink({ id: block.id, linkPosition })}>
          <Line
            borderWidth={4}
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

  renderLineToCursor = position => {
    let { block, cursorPosition, blocksToLinkArray } = this.props;
    let { offsetX, offsetY } = this.state;
    if (_.includes(blocksToLinkArray, block.id) && block.links.length < block.neededLinks) {
      return (
        <Line
          borderWidth={4}
          borderStyle="solid"
          borderColor="black"
          zIndex={1}
          x0={block.position.x + position + offsetX}
          y0={block.position.y + blockHeight / 2 + offsetY}
          x1={cursorPosition.x + offsetX}
          y1={cursorPosition.y + offsetY}
        />
      );
    } else {
      return null;
    }
  };

  showProperties = (value, key) => {
    if (key === "binary") {
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
      if (key === "frequency") {
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
  };

  updateBlockOnClick = (value, key) => {
    this.props.updateBlockValue({ value, key, block: this.props.block });
    this.props.blockUpdated({ block: this.props.block, updated: true });
  };

  render = () => {
    const { block } = this.props;
    const bounds = this.getBounds();
    const position = this.getPosition(bounds);
    return (
      <Fragment>
        <Draggable
          //grid={[10, 10]}
          bounds={bounds}
          onDrag={this.handleDrag}
          position={position}
        >
          <Grid
            onClick={this.handleClick}
            container
            style={{ height: 100, width: 192, position: "absolute", zIndex: 2 }}
          >
            {block.neededLinks === 0 ? null : (
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

            <Grid item xs={10} style={blockStyle}>
              <Typography variant="subheading" gutterBottom align="center">
                <b>{block.name}</b>
              </Typography>
              {_.map(block, this.showProperties)}
            </Grid>
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
  blocksToLink: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {
    clickedBlock,
    projects,
    selectedLink,
    currentProject,
    blocksToLinkArray
  } = state.mainPage.present;
  return {
    clickedBlock,
    projects,
    selectedLink,
    currentProject,
    blocksToLinkArray
  };
};

export default connect(
  mapStateToProps,
  actions
)(Block);
