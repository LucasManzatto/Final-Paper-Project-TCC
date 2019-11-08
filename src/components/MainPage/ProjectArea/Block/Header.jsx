import React, { Fragment, useState } from 'react'
import withWidth from '@material-ui/core/withWidth'
import InfoIcon from '@material-ui/icons/Info'
import Popover from '@material-ui/core/Popover'
import SideBarBlock from '../../SideBar/SideBarBlock'
import { blockClicked, deleteBlock } from '../../actions'
import { useDispatch } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'

const blockTopRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const Header = ({ block, clickedBlock, width }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const handleClick = event => {
    if (block.id !== clickedBlock.id) {
      dispatch(blockClicked(block))
    }
    if (width === 'xs' || width === 'sm') {
      setAnchorEl(event.currentTarget)
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Fragment>
      <Grid item xs={2} style={blockTopRow}>
        <InfoIcon style={{ fontSize: 'larger', cursor: 'pointer' }} onClick={handleClick} />
        <Popover
          id="simple-popper"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
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
      <Grid item xs={8} style={blockTopRow}>
        <Typography variant="subheading" gutterBottom align="center" style={{ margin: '0px' }}>
          <b>{block.name}</b>
        </Typography>
      </Grid>
      <Grid item xs={2} style={blockTopRow}>
        <CloseIcon style={{ fontSize: 'larger', cursor: 'pointer' }} onClick={() => dispatch(deleteBlock(block.id))} />
      </Grid>
    </Fragment>
  )
}

export default withWidth()(Header)