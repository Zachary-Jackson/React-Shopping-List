import React from "react";
import PropTypes from "prop-types";

import { getClassName, itemNotInArrayOrEmpty } from "./form_helpers.js";

/**
 * This is a text form component that ensures the user can not enter
 * any text that is props.items
 * Items/descriptsion can not be larger than 25 characters
 *
 * :prop groups: An array of groups the user can select from
 * :prop items: An array of items that can not be submitted
 * :prop handleSubmit: A function that will get called with a valid form
 *
 * :state description: The user's description
 * :state message: The help message showing the user the input predictions
 * :state valid: Changes whether or not the input button is valid
 * :state value: The input form's value
 */
export default class ItemForm extends React.Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      descripiton: "",
      message: "",
      valid: true,
      value: ""
    };
  }

  handleDescriptionChange = event => {
    /**
     * Sets the state of the descripiton
     *
     * :event: takes a standard event value
     */
    const userImput = event.target.value;
    if (userImput.length < 25) {
      this.setState({
        message: "",
        description: event.target.value
      });
    } else {
      this.setState({
        message: "Descriptions can only be 25 characters"
      });
    }
  };

  handleNameChange = event => {
    /**
     * Sets the state of value/valid
     *
     * :event: takes a standard event value
     */
    const userImput = event.target.value;
    if (userImput.length < 25) {
      this.setState({
        message: "",
        value: event.target.value
      });
    } else {
      this.setState({
        message: "You have reached the 25 character limit!"
      });
    }

    const valid = itemNotInArrayOrEmpty(this.props.items, event.target.value);
    this.setState({
      itemValid: valid
    });
  };

  render() {
    /* Renders a text form */

    // Get all items out of this.props.groups and turn them into HTML elements
    let groupItems = this.props.groups.map((group, index) => {
      return [<option key={index}>{group}</option>];
    });

    return (
      <form className="py-2" onSubmit={this.props.handleSubmit}>
        <div>{this.state.message}</div>

        <div className="col">
          <label>
            New item:
            <input
              autoComplete="off"
              name="newItem"
              onChange={this.handleNameChange}
              placeholder="passion fruit"
              type="text"
              value={this.state.value}
            />
          </label>
        </div>

        <div className="col">
          <div>
            <label>Group</label>
            <select name="newGroup">{groupItems}</select>
          </div>

          <div className="col">
            <label>
              Description:
              <input
                autoComplete="off"
                name="newDescription"
                onChange={this.handleDescriptionChange}
                placeholder="Native to South America"
                type="text"
                value={this.state.description}
              />
            </label>
          </div>
        </div>

        <input
          autoComplete="off"
          className={getClassName(this.state.itemValid)}
          type="submit"
          value="Add"
          disabled={!this.state.itemValid}
        />
      </form>
    );
  }
}
