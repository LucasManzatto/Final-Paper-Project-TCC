import React from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import _ from 'lodash';
import Slider from 'material-ui/Slider';


//redux
import {connect} from 'react-redux';
import {updateBlockValue} from '../actions';
import {clickedBlockSelector} from '../selectors';
//import {updateBlockValue} from '../SideBar/actions';


const SideBarBlock = props =>{
    const showProperties = (value,key)=>{
            //Mostrar o nome em um Sub-Header
            if(key === "name"){
                return(<Subheader key={key}>{value}</Subheader>)
            }
            //Esconde o id do block , precisa mudar pra nao retornar o ID
            if(key !== "id" && key !== "position" && key !== "type"){
                return(
                    <div key={key}>
                        <p>{_.capitalize(key)}</p>
                        <Slider
                            min={0} step={1} max={10}
                            value={value}
                            onChange={(event,newValue)=> handleFirstSlider(newValue,key)}
                         />
                    </div>
                )
            }
    }
    const handleFirstSlider = (value,key) => {
        const payload ={
            value,
            key,
            id: props.clickedBlock.id
        }
        props.updateBlockValue(payload);
    };

    return(
        <List>
            {_.map(props.clickedBlock,showProperties)}
        </List>
    );
}
const mapStateToProps = state =>{
    return{
        clickedBlock : clickedBlockSelector(state),
    }
}
export default connect(mapStateToProps,{updateBlockValue})(SideBarBlock);
