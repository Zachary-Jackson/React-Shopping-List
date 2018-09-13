import React from "react";
import ReactDOM from "react-dom";

import ItemForm from "./item_form.js";

import "./styles.css";

class List extends React.Component {
  state = {
    items: ["apple", "kiwi", "plum"],
    newItemFormKey: 1
  };

  handleItemSubmit = event => {
    /**
     * Takes a form value and pushes it to this.state.items
     *
     * :event: takes a standard event value
     */
    event.preventDefault();
    const newItem = event.target.elements.newItem.value;
    const newArrary = this.state.items.push(newItem);

    // This allows render to set a new key to reset the ItemForm
    // perhaps not the best way to do this.
    this.setState({
      newItemFormKey: this.state.newItemFormKey + 1
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

    console.log(this.state.newItemFormKey);

    return (
      <div>
        <h1>Shopping List</h1>
        <div>{listItems}</div>
        <ItemForm
          key={this.state.newItemFormKey}
          items={this.state.items}
          handleSubmit={this.handleItemSubmit}
        />
      </div>
    );
  }
}

const element = <List />;

ReactDOM.render(element, document.getElementById("root"));
