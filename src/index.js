import React from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import ReactDOM from "react-dom";

import About from "./about.js";
import List from "./list.js";

import "./styles.css";

const Links = () => (
  <nav>
    <Link className="nav-spacing" to="/">
      List
    </Link>
    <Link className="nav-spacing" to={{ pathname: "/about" }}>
      About
    </Link>
  </nav>
);

const App = props => (
  <div>
    <h1>Shopping List</h1>
    <Router basename={props.path}>
      <div>
        <Links />
        <Route exact path="/" component={List} />
        <Route exact path="/about" component={About} />
      </div>
    </Router>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
