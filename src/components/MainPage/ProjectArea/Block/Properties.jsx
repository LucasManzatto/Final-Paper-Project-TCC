import React from 'react'
import { updateBlockValue } from '../../actions'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { valueToBinary } from '../../utils'

import Typography from '@material-ui/core/Typography'
import Left from '@material-ui/icons/ChevronLeft'
import Right from '@material-ui/icons/ChevronRight'

const iconStyle = {
  position: 'relative',
  top: '7px',
  cursor: 'pointer'
}

const Properties = ({block}) => {
  const dispatch = useDispatch()
  return _.map(block.keysToShow, key => {
    const value = block[key]
    if (key === 'binary') {
      return (
        <Typography key={key} variant="body1" style={{ marginLeft: 4 }}>
          <b>{_.capitalize(key)}:</b>
          {valueToBinary(value)}
        </Typography>
      )
    }
    const sum = key === 'frequency' ? 6 : 1
    return (
      <Typography key={key} variant="body1" style={{ marginLeft: 4 }}>
        <b>{_.capitalize(key)}:</b>
        <Left
          onClick={() => dispatch(updateBlockValue({ value: value - sum, key, blockId: block.id }))}
          style={iconStyle}
        />
        {value}
        <Right
          onClick={() => dispatch(updateBlockValue({ value: value + sum, key, blockId: block.id }))}
          style={iconStyle}
        />
      </Typography>
    )
  })
}

export default Properties