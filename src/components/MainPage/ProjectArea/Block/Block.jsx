import _ from 'lodash'
import Draggable from 'react-draggable'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useEffect } from 'react'

import withWidth from '@material-ui/core/withWidth'
import { Line } from 'react-lineto'

import { calculateOffset } from '../../utils'
import * as selectors from '../../selectors'
import usePrevious from '../../../../hooks/UsePrevious'

//redux
import { connect, useDispatch } from 'react-redux'
import * as actions from '../../actions'
import LinkLine from '../LinkLine'
import Properties from './Properties'
import Header from './Header'
import InputOutput from './InputOutput'
import useWindowDimensions from '../../../../hooks/WindowDimensions'

const BASE_WIDTH = 160
const BASE_HEIGHT = 108
const INPUT_OUTPUT_MOBILE_HEIGHT = '10%'
const INPUT_OUTPUT_DESKTOP_HEIGHT = '100%'

const outputWidth = BASE_WIDTH * 0.1
const outputHeight = BASE_HEIGHT * 0.1
const blockStyle = {
  borderStyle: 'solid',
  borderWidth: '1px 1px 1px 1px',
  borderColor: '#77a6f7',
  backgroundColor: '#d3e3fc',
  zIndex: 2,
}

const OUTPUT = 195
const INPUT = 5

const Block = ({ width, block, blocks, selectedLink, clickedBlock, blocksToLink, moveBlock, blocksToLinkArray, indexOfBlock, cursorPosition }) => {
  const [state, setState] = useState({
    projectTabOffset: 0,
    offsetX: 0,
    offsetY: 0,
    isMobile: false
  })
  const [dimensions, setDimensions] = useState({ outputWidth, outputHeight })
  const windowDimensions = useWindowDimensions()
  const [bounds, setBounds] = useState()
  const [position, setPosition] = useState()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    let dimensions
    const newIsMobile = width === 'xs'
    if (newIsMobile) {
      dimensions = {
        blockTotalWidth: BASE_WIDTH,
        blockTotalHeight: hasInput(block.neededLinks) ? BASE_HEIGHT + (outputHeight * 2) : BASE_HEIGHT + outputHeight,
        blockWidth: 12,
        blockHeight: hasInput(block.neededLinks) ? '80%' : '90%'
      }
    }
    else {
      dimensions = {
        blockTotalWidth: hasInput(block.neededLinks) ? BASE_WIDTH + (outputWidth * 2) : BASE_WIDTH + outputWidth,
        blockTotalHeight: BASE_HEIGHT,
        blockWidth: hasInput(block.neededLinks) ? 10 : 11,
        blockHeight: '100%'
      }
    }

    const offset = calculateOffset('projectTab')
    const newBounds = getBounds(offset.componentOffset, dimensions)
    const newPosition = getPosition(newBounds)


    if (!_.isEqual(newPosition, block.position)) {
      moveBlock({
        value: { x: newPosition.x, y: newPosition.y },
        indexOfBlock: indexOfBlock
      })
    }
    setIsMobile(newIsMobile)
    setDimensions(prevState => {
      return { ...prevState, ...dimensions }
    })
    setBounds(newBounds)
    setPosition(newPosition)
    setState(prevState => {
      return {
        ...prevState,
        ...{
          projectTabOffset: offset.componentOffset,
          offsetX: offset.offsetX,
          offsetY: offset.offsetY
        }
      }
    })
  }, [width,windowDimensions])


  useEffect(() => {
    setPosition(block.position)
  }, [block.position])


  const getBounds = (projectTabOffset, dimensions) => ({
    left: 0,
    top: 0,
    right: projectTabOffset.width - dimensions.blockTotalWidth,
    bottom: projectTabOffset.height - dimensions.blockTotalHeight
  })

  const getPosition = bounds => {
    let { position } = _.cloneDeep(block)
    if (position.x > bounds.right) {
      position.x = bounds.right
    }
    if (position.y > bounds.bottom) {
      position.y = bounds.bottom
    }

    return position
  }

  const handleDrag = (e, ui) => {
    const { x, y } = ui
    moveBlock({
      value: { x, y },
      indexOfBlock: indexOfBlock
    })
  }

  const hasInput = neededLinks => neededLinks > 0

  const renderLineToCursor = () => {
    let { offsetX, offsetY } = state
    //render line only when the block is not fully linked and is not already linking
    return (
      <Line
        borderWidth={3}
        borderStyle="solid"
        borderColor="black"
        zIndex={1}
        x0={block.position.x + INPUT + offsetX}
        y0={block.position.y + dimensions.blockTotalHeight / 2 + offsetY}
        x1={cursorPosition.x + offsetX}
        y1={cursorPosition.y + offsetY}
      />
    )
  }
  const isLinking = (block) => _.includes(blocksToLinkArray, block)

  return (
    <Fragment>
      <Draggable
        grid={[10, 10]}
        bounds={bounds}
        onDrag={handleDrag}
        // onStop={this.handleStop}
        position={position}
      >
        <Grid
          container
          style={{ height: dimensions.blockTotalHeight, width: dimensions.blockTotalWidth, position: 'absolute', zIndex: 2 }}
        >
          {hasInput(block.neededLinks) && (
            // INPUT
            <InputOutput isInput={true} block={block} blocksToLinkArray={blocksToLinkArray} isMobile={isMobile} />
          )}
          {/* NAME AND PROPERTIES */}
          <Grid item container xs={dimensions.blockWidth} style={{ ...blockStyle, height: dimensions.blockHeight }} direction='row'>
            {/* BLOCK INFO */}
            <Grid item container xs={12} style={{ height: '20%' }}>
              <Header block={block} clickedBlock={clickedBlock} />
            </Grid>
            {/* BLOCK PROPERTIES */}
            <Grid item container xs={12} style={{ height: '70%' }}>
              <Properties block={block} />
            </Grid>
          </Grid>
          {/* OUTPUT */}
          <InputOutput isInput={false} block={block} blocksToLinkArray={blocksToLinkArray} isMobile={isMobile} />
        </Grid>

      </Draggable>
      {block.links.length > 0 &&
        <LinkLine block={block}
          blocks={blocks}
          selectedLink={selectedLink}
          width={width}
          offsetX={state.offsetX}
          offsetY={state.offsetY}
          blockDimensions={dimensions}
          toCursor={false}
        />}
      {isLinking(block) &&
        renderLineToCursor()}
    </Fragment >
  )
}

Block.propTypes = {
  selectLink: PropTypes.func.isRequired,
  blockClicked: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
  dimensions: PropTypes.object.isRequired,
  blocksToLink: PropTypes.func.isRequired,
  blocksToLinkArray: PropTypes.array.isRequired
}

const mapStateToProps = (state, props) => {
  const { clickedBlock, projects, selectedLink, currentProject, blocksToLinkArray } = state.mainPage.present

  return {
    clickedBlock,
    blocks: projects[currentProject].blocks,
    blocksToLinkArray,
    selectedLink,
    linkedBlocks: selectors.linkedBlocksSelector(state, props),
    indexOfBlock: selectors.getIndexOfBlockSelector(state, props)
  }
}

export default withWidth()(connect(mapStateToProps, actions)(Block))
