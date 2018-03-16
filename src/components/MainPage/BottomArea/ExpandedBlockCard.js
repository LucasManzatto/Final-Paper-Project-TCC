import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import BlockCard from './BlockCard';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

/**
 * The dialog width has been set to occupy the full width of browser through the `contentStyle` property.
 */
export default class ExpandBlockCard extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <FlatButton primary={true} label="Expand" onClick={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          contentStyle={customContentStyle}
          bodyStyle = {{height: 300}}
          onRequestClose={this.handleClose}
          open={this.state.open}
        >
          <BlockCard block={this.props.block} key={this.props.block.id}/>
        </Dialog>
      </div>
    );
  }
}
