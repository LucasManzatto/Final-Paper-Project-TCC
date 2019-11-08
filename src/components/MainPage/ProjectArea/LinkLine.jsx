import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { selectLink } from '../actions'
import { Line } from 'react-lineto'
import _ from 'lodash'

const LinkLine = ({ block, blocks, selectedLink, width, offsetX, offsetY, blockDimensions }) => {
  const { blockTotalWidth, blockTotalHeight, outputHeight, outputWidth } = blockDimensions
  const dispatch = useDispatch()

  if (block.neededLinks === 0) {
    return null
  }
  return block.links.map((linkPosition) => {
    let linkBlock = _.find(blocks, (block) => block.id === linkPosition)
    let borderStyle = 'solid'
    if (selectedLink.id === block.id && selectedLink.linkPosition === linkPosition) {
      borderStyle = 'dashed'
    }
    let x0, x1, y0, y1
    // No mobile input e output são invertidos
    if (width === 'xs') {
      x0 = block.position.x + blockTotalWidth / 2 + offsetX
      y0 = block.position.y + offsetY + outputHeight / 2
      x1 = linkBlock.position.x + blockTotalWidth / 2 + offsetX
      y1 = linkBlock.position.y + offsetY + blockTotalHeight - outputHeight / 2
    }
    else {
      x0 = block.position.x + offsetX + outputWidth
      y0 = block.position.y + blockTotalHeight / 2 + offsetY
      x1 = linkBlock.position.x + offsetX + blockTotalWidth - outputWidth * 2
      y1 = linkBlock.position.y + blockTotalHeight / 2 + offsetY
    }
    return (
      <div key={linkPosition} onClick={() => dispatch(selectLink({ id: block.id, linkPosition }))}>
        <Line
          borderWidth={3}
          borderStyle={borderStyle}
          borderColor="black"
          zIndex={1}
          x0={x0}
          y0={y0}
          x1={x1}
          y1={y1}
        />
      </div>
    )
  })
}

export default LinkLine