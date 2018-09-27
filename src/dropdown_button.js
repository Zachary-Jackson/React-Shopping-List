/**
 *  A very similar example/refrence of this code can be found here:
 *
 * https://reactstrap.github.io/components/button-dropdown/
 */

import PropTypes from "prop-types";
import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

/**
 * This is a dropdown button that allows the user to select an option
 */
export default class Example extends React.Component {
  static propTypes = {
    /** Groups that the user can select from */
    groups: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      /** A Boolien that determins if the dropdown box is shown */
      dropdownOpen: false
    };
  }

  toggle() {
    /**
     * Changes the state of this.state.dropdownOpen's bolien value
     */
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    // Get all items out of this.props.groups and turn them into HTML elements
    let dropdownOptions = this.props.groups.map((group, index) => {
      return [<DropdownItem key={index}>{group}</DropdownItem>];
    });

    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>Groups</DropdownToggle>
        <DropdownMenu>
          {dropdownOptions}
          <DropdownItem divider />
          <DropdownItem>All groups</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
