import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import Slide from "@material-ui/core/Slide"
import Paper from "@material-ui/core/Paper"
import AspectRatioIcon from '@material-ui/icons/AspectRatio'

import Properties from '../ProjectArea/Block/Properties'

import { Col } from "react-flexbox-grid"

import _ from "lodash"

import BlockCard from "./BlockCard"

const styles = {
  iconStyle: {
    position: "relative",
    top: "6px"
  },
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const ExpandedBlockCard = ({ classes, block }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClickOpen = () => setIsOpen(true)

  const handleClose = () => setIsOpen(false)

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <AspectRatioIcon onClick={handleClickOpen} />
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color="primary">
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {block.name}
            </Typography>
            <div className={classes.flex}>
              <Properties block={block} />
            </div>
          </Toolbar>
        </AppBar>
        <Paper style={{ height: "100%" }}>
          <Col center="xs" style={{ height: "90%", textAlign: "center" }}>
            <div style={{ height: "100%", paddingLeft: 16 }}>
              <BlockCard block={block} key={block.id} expanded={true} />
            </div>
          </Col>
        </Paper>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(ExpandedBlockCard)
