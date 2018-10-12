import React from "react";
import { BrowserRouter as Router, Route, Link , withRouter } from "react-router-dom";
import App from "C:/Users/Lucas/Documents/GitHub/tcc/src/components/MainPage/App.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { Auth } from "aws-amplify";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   width: 200
  // },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 200,
    textAlign: "center"
  },
  // card: {
  //   maxWidth: 345
  // },
  media: {
    height: 140
  }
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      senha: ""
    };
  }

  validateForm = () =>
    this.state.usuario.length > 0 && this.state.senha.length > 0;

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.usuario == "Duvewet" && this.state.senha == "1234") {
      this.props.history.push("/Home");
    }
    else{
      alert("Usuário ou senha inválidos.");
    }
    // try {
    //   await Auth.signIn(this.state.usuario, this.state.password);
    //   alert("Logged in");
    // } catch (e) {
    //   alert(e.message);
    // }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3} justify="center">
          <Card style={{ textAlign: "center" }} className={classes.card}>
            <CardHeader title="Login" />
            <form
              onSubmit={this.handleSubmit}
              className={classes.container}
              noValidate
              autoComplete="off"
            >
              <CardContent>
                <TextField
                  autoFocus
                  id="usuario"
                  label="Usuário"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange}
                  margin="normal"
                />
                <div />
                <TextField
                  id="senha"
                  label="Senha"
                  className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                  margisn="normal"
                />
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button
                  type="submit"
                  disabled={!this.validateForm()}
                  // component={Link}
                  // to="/Home"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Login
                </Button>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(LoginPage));
