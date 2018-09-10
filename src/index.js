import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class List extends React.Component {
  state = {
    items: ["apple", "kiwi", "plum"],
    newItemInput: "",
    newItemValid: false
  };

  itemValid(item) {
    /**
     * Checks to see if an item is empty or in self.state.items
     *
     * :param item: String value of an item
     * :return : Boolien True if not empty or in self.state.items
     */
    if (item === "") {
      return false;
    } else if (this.state.items.includes(item)) {
      return false;
    }
    return true;
  }

  handleItemChange = event => {
    /**
     * Sets the state of newItemInput/newItemValid
     *
     * :event: takes a standard event value
     */
    this.setState({
      newItemInput: event.target.value
    });
    const valid = this.itemValid(event.target.value);
    this.setState({
      newItemValid: valid
    });
  };

  handleItemSubmit = event => {
    /**
     * Takes a form value and pushes it to this.state.items
     * this.state.newItemInput is also reset
     *
     * :event: takes a standard event value
     */
    event.preventDefault();
    const newItem = event.target.elements.newItem.value;
    const newArrary = this.state.items.push(newItem);
    this.setState({
      screenDisplay: newArrary
    });
    this.setState({
      newItemInput: ""
    });
  };

  render() {
    // Get all items out of this.state.items and turn them into paragraphs
    let listItems = this.state.items.map((item, index) => {
      const readableIndex = index + 1;
      return (
        <h1>
          {readableIndex}. {item}
        </h1>
      );
    });

    return (
      <div>
        <h1>Shopping List</h1>
        <div>{listItems}</div>

        <form onSubmit={this.handleItemSubmit}>
          <label>
            New item:
            <input
              type="text"
              value={this.state.newItemInput}
              onChange={this.handleItemChange}
              name="newItem"
            />
          </label>
          <input
            type="submit"
            value="Submit"
            disabled={!this.state.newItemValid}
          />
        </form>
      </div>
    );
  }
}

const element = <List />;

ReactDOM.render(element, document.getElementById("root"));
