import React from "react";
import {withRouter} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
// import firebase from 'firebase'

const styles = theme => ({
  // textField: {   marginLeft: theme.spacing.unit,   marginRight:
  // theme.spacing.unit,   width: 200 },
  root: {
    ...theme
      .mixins
      .gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 200,
    textAlign: "center"
  },
  // card: {   maxWidth: 345 },
  media: {
    height: 140
  }
});

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInSuccessUrl: '/Home',
  // We will display Google and Facebook as auth providers.
  // signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID, firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID, firebase.auth.GithubAuthProvider.PROVIDER_ID]
}
class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      senha: ""
    };
  }

  validateForm = () => this.state.usuario.length > 0 && this.state.senha.length > 0;

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.usuario === "admin" && this.state.senha === "admin") {
      this
        .props
        .history
        .push("/Home");
    } else {
      alert("Usuário ou senha inválidos.");
    }
    // try {   await Auth.signIn(this.state.usuario, this.state.password);
    // alert("Logged in"); } catch (e) {   alert(e.message); }
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <CssBaseline/>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{
          minHeight: "100vh"
        }}>
          <Grid item xs={3} justify="center">
            <Card
              style={{
              textAlign: "center"
            }}
              className={classes.card}>
              <CardHeader title="Login"/>
              <form
                onSubmit={this.handleSubmit}
                className={classes.container}
                noValidate
                autoComplete="off">
                <CardContent>
                  <TextField
                    autoFocus
                    id="usuario"
                    label="Usuário"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange}
                    margin="normal"/>
                  <div/>
                  <TextField
                    id="senha"
                    label="Senha"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                    margisn="normal"/>
                    {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> */}
                </CardContent>
                <CardActions
                  style={{
                  justifyContent: "center"
                }}>
                  <Button type="submit" disabled={!this.validateForm()} // component={Link} }} // to="/Home"
                    variant="contained" color="primary"  className={classes.button}>
                    Login
                  </Button>
                </CardActions>
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
      ); } } LoginPage.propTypes = {classes : PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(LoginPage));