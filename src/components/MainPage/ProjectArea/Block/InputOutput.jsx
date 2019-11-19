import React from 'react'
import { useDispatch } from 'react-redux'
import { blocksToLink } from '../../actions'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid'

const blockStyleInput = {
  cursor: 'pointer',
  maxWidth: '100%',
  backgroundColor: '#00887a'
}
const blockStyleOutput = {
  cursor: 'pointer',
  maxWidth: '100%',
  backgroundColor: '#77a6f7'
}
const OUTPUT = 195
const INPUT = 5

const blocksToLinkArrayIsFull = array => array.length >= 2

const InputOutput = ({ isInput, block, blocksToLinkArray, isMobile }) => {
  const dispatch = useDispatch()
  const linkBlocks = (position) => {
    //Can link only from the input to the output and cannot link fully linked blocks
    //Need to check if a block is already fully linked but other block wants to link with
    //it in the output
    //Nao deixar linkar quando o bloco que voce quer linkar nao esta linkado e nao tem Data
    const isDataEmpty = block.data && block.data.length === 0
    const isBlocksToLinkArrayEmpty = blocksToLinkArray && blocksToLinkArray.length === 0
    if (
      (position === OUTPUT && (isBlocksToLinkArrayEmpty || isDataEmpty)) ||
      ((block.links && block.links.length) > block.neededLinks && block.neededLinks !== 0)
    ) {
      return
    } else if (!blocksToLinkArrayIsFull(blocksToLinkArray) && !_.includes(blocksToLinkArray, block)) {
      dispatch(blocksToLink({ block }))
    }
  }

  let style, type, direction, inputOutputSize, inputOutputHeight, inputOutputWidth
  if (isInput) {
    style = blockStyleInput
    type = INPUT
  }
  else {
    style = blockStyleOutput
    type = OUTPUT
  }
  if (isMobile) {
    direction = 'row'
    inputOutputSize = 12
    inputOutputHeight = { height: '10%' }
    inputOutputWidth = 3
  }
  else {
    direction = 'column'
    inputOutputSize = 1
    inputOutputHeight = { height: '100%' }
    inputOutputWidth = 4
  }

  return (
    <Grid item container direction={direction} xs={inputOutputSize} style={inputOutputHeight} justify='center'>
      <Grid
        item
        xs={inputOutputWidth}
        style={style}
        onClick={() => linkBlocks(type)}
      />
    </Grid>
  )
}

export default InputOutput