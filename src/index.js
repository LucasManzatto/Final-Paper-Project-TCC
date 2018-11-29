import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/MainPage/App";
import LoginPage from "./components/LoginPage/LoginPage.js";
import { Provider } from "react-redux";
import { createStore } from "redux";
import registerServiceWorker from "./registerServiceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import reducers from "./rootReducer";
import "typeface-roboto";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// const theme = createMuiTheme({
//   palette: {
//     background: { default: "#374785", paper: "#a8d0e6" },
//     primary: { main: "#24305e" },
//     secondary: {
//       main: "#a8d0e6"
//     }
//   }
// });
const theme2 = createMuiTheme({
  palette: {
    background: { default: "#d3e3fc", paper: "#ffffff" },
    primary: { main: "#77a6f7" },
    secondary: {
      main: "#a8d0e6"
    }
  }
});
// const theme3 = createMuiTheme({
//   palette: {
//     background: { default: "#f2f2f2", paper: "#ffffff" },
//     primary: { main: "#3b945e" },
//     secondary: {
//       main: "#57ba98"
//     }
//   }
// });
//Teste

ReactDOM.render(
  <Fragment>
    <Provider
      store={createStore(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <MuiThemeProvider theme={theme2}>
        <Router>
          <div>
            <Route exact path="/" component={LoginPage} />
            <Route path="/Home" component={App} />
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
  </Fragment>,
  document.getElementById("root")
);
registerServiceWorker();
