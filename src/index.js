import React from "react";
import ReactDOM from "react-dom";

import DeleteItemForm from "./delete_item_form.js";
import ItemForm from "./item_form.js";

import "./styles.css";

class List extends React.Component {
  state = {
    items: ["apple", "coconut", "kiwi", "pear", "pineapple", "plum"],
    formKeys: [1, 2]
  };

  handleItemDelete = event => {
    /**
     * Uses a form event value to delete an item from
     * state.items
     *
     * :event: takes a standard event value
     */
    const deletedItem = event.target.elements.deletedItem.value;
    const oldItems = this.state.items;

    // Get a new state.items without the deletedItem
    const newItems = oldItems.filter(word => word !== deletedItem);
    this.setState({
      items: newItems
    });

    this.renewKeys();
  };

  handleItemSubmit = event => {
    /**
     * Takes a form event value and pushes it to this.state.items
     *
     * :event: takes a standard event value
     */
    event.preventDefault();
    const newItem = event.target.elements.newItem.value;

    this.state.items.push(newItem);
    const sortedArray = this.state.items.sort();
    this.setState({
      items: sortedArray
    });

    this.renewKeys();
  };

  renewKeys() {
    /**
     * Adds one to each item in this.state.formKeys to reset the forms
     * in the render method
     *
     * :event: takes a standard event value
     */

    // perhaps not the best way to do this.
    const oldKeys = this.state.formKeys;
    const newKeys = oldKeys.map(x => x + 1);
    this.setState({
      formKeys: newKeys
    });
  }

  render() {
    // Get all items out of this.state.items and turn them into paragraphs
    let listItems = this.state.items.map((item, index) => {
      return <li key={index}>{item}</li>;
    });

    return (
      <div>
        <h1>Shopping List</h1>

        <ol>
          <div className="left-align">{listItems}</div>
        </ol>
        <ItemForm
          key={this.state.formKeys[0]}
          items={this.state.items}
          handleSubmit={this.handleItemSubmit}
        />
        <DeleteItemForm
          key={this.state.formKeys[1]}
          items={this.state.items}
          handleSubmit={this.handleItemDelete}
        />
      </div>
    );
  }
}

const element = <List />;

ReactDOM.render(element, document.getElementById("root"));
