import React ,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const Menu = props =>{
    const component = new React.Component(props);
    component.state = {
        logged: false,
        open : false
    };

    const handleChange = () => {
        component.setState({logged: !component.state.logged});
    };
    const handleLogin = () =>{
        component.setState({logged: !component.state.logged, open: true});
    }
    const handleClose = () =>{
        component.setState({open: false});
    }

    const Logged = () => (
        <IconMenu
            iconButtonElement={
              <IconButton ><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" onClick={handleChange}/>
        </IconMenu>
    );

    const Login = () =>(
        <FlatButton style={{color: "#ffffff",marginTop:7}} label="Login" onClick={handleLogin}/>
    )

    component.render = () =>{
        const actions = [
            <FlatButton
            label="Cancel"
            primary={true}
            onClick={handleClose}
            />,
            <FlatButton
            label="Submit"
            primary={true}
            onClick={handleClose}
            />,
        ];
        return(
            <div>
                <AppBar
                    title="Projeto TCC"
                    iconElementRight={component.state.logged ? <Logged /> : <Login />}
                />
                <Dialog
                    style={{textAlign : 'center'}}
                    title="Login"
                    actions={actions}
                    modal={true}
                    open={component.state.open}
                    onRequestClose={handleClose}
                >
                <TextField
                  floatingLabelText="Login"
                  autoFocus
                  floatingLabelFixed={true}
                />
                <br/>
                <TextField
                  floatingLabelText="Password"
                  floatingLabelFixed={true}
                  type="password"
                />
              </Dialog>
            </div>
        )
    }
    return component;
};
export default Menu;
