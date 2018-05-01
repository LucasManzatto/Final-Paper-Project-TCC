import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import _ from 'lodash';

import BlockCard from './BlockCard';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes ,block } = this.props;
    let haveProperties = false;
    if(!_.isNil(block.frequency)){
        haveProperties =true;
    }
    const showProperties = haveProperties ? (
        <div className={classes.flex}>
            <Typography color="inherit">
              Frequency:{block.frequency}
            </Typography>
            <Typography color="inherit">
              Amplitude:{block.amplitude}
            </Typography>
        </div>
    ) : (<div></div>)
    return (
      <div>
        <Button onClick={this.handleClickOpen} color="primary">Expand</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {block.name}
              </Typography>
              {showProperties}
            </Toolbar>
          </AppBar>
          <div style={{height:500 - (100*this.props.amplitude)}}>
          </div>
            <BlockCard block={block}/>
          <div style={{height:500 - (100*this.props.amplitude)}}>
          </div>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
