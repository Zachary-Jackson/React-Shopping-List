import PropTypes from "prop-types";
import React from "react";

import { getClassName, itemNotInArrayOrEmpty } from "./form_helpers.js";

/**
 * This is a text form component that ensures the user can not enter
 * any text that is in props.items (Case insensitive)
 *
 * Items/descriptsion can not be larger than 25 characters
 */
export default class ItemForm extends React.Component {
  static propTypes = {
    /** Groups that the user can select from */
    groups: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** Items that the user can not submit */
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** A function that will get called with a valid form */
    handleSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      /** The user's description */
      descripiton: "",
      /** The help message showing the user the input predictions */
      message: "",
      /** Changes whether or not the input button is valid */
      valid: true,
      /** The input form's value */
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
    const userInput = event.target.value;
    if (userInput.length < 25) {
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
          <input
            autoComplete="off"
            className="mb-2"
            name="newItem"
            onChange={this.handleNameChange}
            placeholder="New item name"
            type="text"
            value={this.state.value}
          />
        </div>

        <div className="col">
          <div>
            <label>Group</label>
            <select name="newGroup">{groupItems}</select>
          </div>

          <div className="col">
            <input
              autoComplete="off"
              className="mb-2"
              name="newDescription"
              onChange={this.handleDescriptionChange}
              placeholder="Description"
              type="text"
              value={this.state.description}
            />
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
