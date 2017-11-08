import React from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

//redux
import {connect} from 'react-redux';
import {updateBlockValue} from '../actions';

const SideBarBlock = props =>{
    const component = new React.Component(props);
    const showProperties = (value,key)=>{
        if(key == "name"){
            return(
                <Subheader>{value}</Subheader>
            )
        }
        else{
            return(
                <TextField
                    onChange={handleInputChange}
                    value={value}
                    floatingLabelText={key}
                />
            )
        }
    }
    const handleInputChange = event =>{
        component.props.updateBlockValue(event.target.value);
    }
    //{_.map(props.clickedBlock,showProperties)}
    component.render = () =>{
        return(
            <List>
                <Subheader>{component.props.clickedBlock.name}</Subheader>
                <TextField
                    onChange={handleInputChange}
                    value={component.props.clickedBlock.Frequency}
                    floatingLabelText="Frequency"
                />
                <TextField
                    onChange={handleInputChange}
                    value={component.props.clickedBlock.Amplitude}
                    floatingLabelText="Amplitude"
                />
            </List>
        );
    }
    return component;
}
const mapStateToProps = state =>{
    return{
        clickedBlock : state.app.clickedBlock
    }
}
export default connect(mapStateToProps,{updateBlockValue})(SideBarBlock);
