import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue, white } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: "#FFFFFF"
    }
  }
});

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function Menu(props) {
  const { classes } = props;
  return (
    //<div className={classes.root}>
    <MuiThemeProvider theme={theme} className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            TCC
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
    //	</div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
