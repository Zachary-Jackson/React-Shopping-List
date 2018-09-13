import React from "react";
/**
 * This is a text form component that ensures the user can not enter
 * any text that is invalid
 *
 * :prop items: An array of items that can not be submitted
 * :prop handleSubmit: A function that will get called whith a valid form
 */
export default class ItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: true,
      value: ""
    };
  }

  itemValid(item) {
    /**
     * Checks to see if an item is empty or in self.state.items
     *
     * :param item: String value of an item
     * :return : Boolien True if not empty or in self.state.items
     */
    if (item === "") {
      return false;
    } else if (this.props.items.includes(item)) {
      return false;
    }
    return true;
  }

  handleChange = event => {
    /**
     * Sets the state of newItemInput/newItemValid
     *
     * :event: takes a standard event value
     */
    this.setState({
      value: event.target.value
    });
    const valid = this.itemValid(event.target.value);
    this.setState({
      itemValid: valid
    });
  };

  render() {
    /* Renders a text form */

    return (
      <form onSubmit={this.props.handleSubmit}>
        <label>
          New item:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            name="newItem"
          />
        </label>
        <input type="submit" value="Submit" disabled={!this.state.itemValid} />
      </form>
    );
  }
}
