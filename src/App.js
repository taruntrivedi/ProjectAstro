import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import DataEntry from "./pages/DataEntry";
import "./App.scss";

function App() {
  return (
    <div className="App">
          <Switch>
            <Route exact path="/" component={DataEntry} />
            {/* <Route exact path="/data-entry" component={DataEntry} /> */}
          </Switch>
    </div>
  );
}

export default App;
