/**
 *  A very similar example/refrence of this code can be found here:
 *
 * https://reactstrap.github.io/components/button-dropdown/
 */

import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

/**
 * This is a dropdown button that allows the user to select an option
 *
 * :prop groups: An array of group options to choose from
 */
export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
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
      return [<DropdownItem>{group}</DropdownItem>];
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
