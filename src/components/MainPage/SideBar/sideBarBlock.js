import React from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import _ from 'lodash';
import Slider from 'material-ui/Slider';

//redux
import {connect} from 'react-redux';
import {updateBlockValue,updateDropDown} from '../actions';
//import {updateBlockValue} from '../SideBar/actions';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const SideBarBlock = props =>{
    let counter=-1;

    const onDropDownChange = (event,index,value) =>{
        const payload = {
                value,
                counter
        }
        props.updateDropDown(payload);
    }
    const showProperties = (value,key)=>{
            //Mostrar o nome em um Sub-Header
            if(key === "name"){
                return(
                    <div>
                        <Subheader key={key}>{value}</Subheader>
                        <p>Description:</p>
                        <p>Formula:</p>
                    </div>
                )
            }
            //Hide unwanted properties
            // if(notHidden(key)){
            //     return(
            //         <div key={key}>
            //             <p>{_.capitalize(key)}</p>
            //             <Slider
            //                 min={0} step={1} max={10}
            //                 value={value}
            //                 onChange={(event,newValue)=> handleSlider(newValue,key)}
            //              />
            //         </div>
            //     )
            // }
    }
    const handleSlider = (value,key) => {
        const payload ={
            value,
            key,
            id: props.clickedBlock.id
        }
        props.updateBlockValue(payload);
    };
    // if(props.clickedBlock.name === 'BPSK'){
    //     return(
    //         <List>
    //             <Subheader key={20}>BPSK</Subheader>
    //             <p>Random Number Generator</p>
    //             <DropDownMenu value={1} onChange={onDropDownChange} >
    //                 <MenuItem value={1} primaryText="Random Number Generator" />
    //                 <MenuItem value={2} primaryText="Random Number Generator 2" />
    //             </DropDownMenu>
    //             <p>Carrier Wave</p>
    //             <DropDownMenu value={2} onChange={onDropDownChange} >
    //                 <MenuItem value={1} primaryText="Carrier Wave" />
    //                 <MenuItem value={2} primaryText="Carrier Wave 2" />
    //             </DropDownMenu>
    //         </List>
    //     )
    // }
    // else{
        return(
            <List>
                {_.map(props.clickedBlock,showProperties)}
            </List>
        );
    // }
}

const notHidden = key =>{
    if(key !== "id"
     && key !== "position"
     && key !== "type"
     && key !== "paused"
     && key !== "data"
     && key !== "absolutePosition"
     && key !== "binary"
     && key !== "linked"
    ){
        return true;
    }
    return false;
}

const mapStateToProps = state =>{
    return{
        clickedBlock : state.mainPage.clickedBlock,
    }
}
export default connect(mapStateToProps,{updateBlockValue,updateDropDown})(SideBarBlock);
