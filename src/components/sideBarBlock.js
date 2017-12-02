import React from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

//redux
import {connect} from 'react-redux';

//Selector
import clickedBlockSelector from '../selectors/selected_block';


const SideBarBlock = props =>{
    const showProperties = (value,key)=>{
            //Mostrar o nome em um Sub-Header
            if(key == "name"){
                return(<Subheader key={key}>{value}</Subheader>)
            }
            //Esconde o id do block , precisa mudar pra nao retornar o ID
            if(key != "id"){
                return(
                    <TextField
                        onChange={handleInputChange}
                        value={value}
                        key={key}
                        floatingLabelText={key}
                    />
                )
            }
    }
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
        clickedBlock : clickedBlockSelector(state)
    }
}
export default connect(mapStateToProps)(SideBarBlock);
