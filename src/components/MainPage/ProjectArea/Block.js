import React, { Fragment } from "react";
import Draggable from "react-draggable";
import _ from "lodash";
import { Line } from "react-lineto";
import Left from "material-ui-icons/ChevronLeft";
import Right from "material-ui-icons/ChevronRight";
import PropTypes from "prop-types";
import { Row, Col } from "react-flexbox-grid";
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
    super(props);
    this.state = {
      projectTabOffset: 0,
      offsetX: 0,
      offsetY: 0,
      mouseClicked: false,
      position: 5
    };
  }
  DeleteLine = () => {
    return (
      <Line
        borderWidth={4}
        borderStyle="solid"
        borderColor="black"
        zIndex={1}
        x0={0}
        y0={0}
        x1={0}
        y1={0}
      />
    );
  };
  renderLineToCursor = position => {
    let { block, cursorPosition } = this.props;
    let { offsetX, offsetY } = this.state;
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
  };
  renderLines = () => {
    let { selectLink, block, projects, selectedLink, currentProject } = this.props;
    let { offsetX, offsetY } = this.state;
    if (block.neededLinks === 0) {
      return null;
    }
    return block.links.map(linkPosition => {
      let linkBlock = projects[currentProject].blocks[linkPosition];
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
    if (this.props.block !== this.props.clickedBlock) {
      this.props.blockClicked(this.props.block);
    }
  };

  linkBlocks = position => {
    this.setState({ position });
    this.props.blocksToLink({
      id: this.props.block.id,
      blocksToLink: this.props.blocksToLinkArray
    });
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
    if (_.includes(nextProps.blocksToLinkArray, this.props.block.id)) {
    }
    if (nextProps.dimensions !== this.props.dimensions) {
      this.renderLines();
    }
    this.renderLineToCursor();
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
      <Fragment>
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
                    <Row middle="xs" style={blockStyleLeft} onClick={() => this.linkBlocks(5)} />
                    <Row style={{ height: 33, width: 20 }} />
                  </Col>
                )}
                <Col xsOffset={1} xs={10} style={blockStyle}>
                  <Typography variant="subheading" gutterBottom align="center">
                    <b>{block.name}</b>
                  </Typography>
                  {_.map(block, this.showProperties)}
                </Col>
                <Col xsOffset={offset} xs={1} style={{ height: 100 }}>
                  <Row style={{ height: 33, width: 20 }} />
                  <Row middle="xs" style={blockStyleRight} onClick={() => this.linkBlocks(195)} />
                  <Row style={{ height: 33, width: 20 }} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Draggable>
        {!_.isNil(block.links) ? this.renderLines() : []}
        {this.props.clickedBlock === this.props.block && this.props.blocksToLinkArray.length != 0
          ? this.renderLineToCursor(this.state.position)
          : null}
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
  return { clickedBlock, projects, selectedLink, currentProject, blocksToLinkArray };
};

export default connect(
  mapStateToProps,
  actions
)(Block);
