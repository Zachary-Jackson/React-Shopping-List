import React from "react";
import { Cookies, withCookies } from "react-cookie";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

import { instanceOf } from "prop-types";

import About from "./about.js";
import List from "./list.js";

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

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Links />
            <Route
              exact
              path="/"
              render={props => <List {...props} cookies={this.props.cookies} />}
            />
            <Route exact path="/about" component={About} />
          </div>
        </Router>
      </div>
    );
  }
}

export default withCookies(App);
