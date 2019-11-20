import React, { Fragment } from 'react'
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

const Properties = ({ block }) => {
  const dispatch = useDispatch()
  return _.map(block.keysToShow, key => {
    const value = block[key]
    const sum = key === 'frequency' ? 6 : 1
    return (
      <Typography key={key} variant="body1" style={{ marginLeft: 8 }}>
        <b>{_.capitalize(key)}:</b>
        {key === 'binary' ?
          valueToBinary(value) :
          <Fragment>
            <Left
              onClick={() => dispatch(updateBlockValue({ value: value - sum, key, blockId: block.id }))}
              style={iconStyle}
            />
            <span>{value}</span>
            <Right
              onClick={() => dispatch(updateBlockValue({ value: value + sum, key, blockId: block.id }))}
              style={iconStyle}
            />
          </Fragment>
        }
      </Typography>
    )
  })
}

export default Properties