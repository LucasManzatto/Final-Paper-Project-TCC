import React from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
import Slider from 'material-ui/Slider';


//redux
import {connect} from 'react-redux';
import {updateBlockValue} from './actions';
//import {updateBlockValue} from '../SideBar/actions';

//Selector
import clickedBlockSelector from './selectors';


const SideBarBlock = props =>{
    const showProperties = (value,key)=>{
            //Mostrar o nome em um Sub-Header
            if(key === "name"){
                return(<Subheader key={key}>{value}</Subheader>)
            }
            //Esconde o id do block , precisa mudar pra nao retornar o ID
            if(key !== "id"){
                return(
                    <div key={key}>
                        <p>{key}</p>
                        <Slider
                            min={0} step={0.1} max={5}
                            value={value}
                            onChange={event => handleFirstSlider(value,key)}
                         />
                    </div>
                )
            }
    }
    const handleFirstSlider = (value,key) => {
        const payload ={
            value,
            key
        }
        props.updateBlockValue(payload);
    };
    //como saber qual campo mudou a variavel
    const handleInputChange = event =>{

    }

    return(
        <List>
            {_.map(props.clickedBlock,showProperties)}

        </List>
    );
}
const mapStateToProps = state =>{
    return{
        clickedBlock : clickedBlockSelector(state),
        slider: state.sideBar.slider
    }
}
export default connect(mapStateToProps,{updateBlockValue})(SideBarBlock);
