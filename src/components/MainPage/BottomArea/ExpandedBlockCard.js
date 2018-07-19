import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';

import { Row,Col} from 'react-flexbox-grid';


import Left from 'material-ui-icons/ChevronLeft';
import Right from 'material-ui-icons/ChevronRight';

import _ from 'lodash';

import BlockCard from './BlockCard';

//react redux
import {connect} from 'react-redux';
import * as actions from '../actions';


const styles = {
    iconStyle :{
        position: 'relative',
        top :'6px'
    },
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

class ExpandedBlockCard extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onClickHandler = (block,value,key) =>{
      this.props.updateBlockValue({value,key,id: block.id});
      this.props.blockUpdated({block,updated: true});
  }

  render() {
    const { classes ,block, amplitude} = this.props;
    let haveProperties = false;
    if(!_.isNil(block.frequency)){
        haveProperties =true;
    }
    const showProperties = haveProperties ? (
        <div className={classes.flex}>
            <Typography color="inherit">
                {/* <Left onClick={(event,value)=> this.onClickHandler(block,block.frequency - 1,'frequency')} style={styles.iconStyle}/> */}
                Frequency: {block.frequency}
                {/* <Right onClick={(event,value)=> this.onClickHandler(block,block.frequency + 1,'frequency')} style={styles.iconStyle}/> */}
            </Typography>
            <Typography color="inherit">
                {/* <Left onClick={(event,value)=> this.onClickHandler(block,block.amplitude - 1,'amplitude')} style={styles.iconStyle}/> */}
                Amplitude: {block.amplitude}
                {/* <Right onClick={(event,value)=> this.onClickHandler(block,block.amplitude + 1,'amplitude')} style={styles.iconStyle}/> */}
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
          <Paper style={{height:'90%'}}>
              <Col center="xs" style={{height:'100%',textAlign :'center'}}>
                <div style={{height:'5%'}}>
                </div>
                  <div style={{height:'90%'}}>
                      <BlockCard block={block} amplitude={this.props.amplitude} key={block.id}/>
                  </div>
                  <div style={{height:'5%'}}>
                  </div>
              </Col>
          </Paper>
        </Dialog>
      </div>
    );
  }
}

ExpandedBlockCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state =>{
    return {amplitude : state.mainPage.present.amplitude}
}

let ExpandedBlockCardWithStyles = withStyles(styles)(ExpandedBlockCard);
export default connect(mapStateToProps,actions)(ExpandedBlockCardWithStyles);
