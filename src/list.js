import { instanceOf } from "prop-types";
import React from "react";
import { Cookies } from "react-cookie";

import DropdownButton from "./components/dropdown_button.js";
import DeleteItemForm from "./forms/delete_item_form.js";
import ItemForm from "./forms/item_form.js";

/**
 * A list program that allows user's to add and delete items
 *
 * :state groups: All of the groups an item can be
 * :state items: All of the items on the list
 * :state itemsSaved: Wither or not the items are saved to a cookie
 * :state formKeys: All of the forms and their associated keys
 */
export default class List extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      items: cookies.get("items") || [
        {
          name: "apple",
          group: "Fruit",
          description: "Grown on an apple tree"
        },
        {
          name: "cambozola",
          group: "Dairy",
          description: "Brie-style blue cheese"
        },
        {
          name: "coconut",
          group: "Fruit",
          description: "Seed of a coconut tree"
        }
      ],
      itemsSaved: true,
      formKeys: [1, 2],
      groups: ["Bakery", "Dairy", "Fruit", "Meat"],
      searchingByGroup: "All"
    };
  }

  _getClassName = valid => {
    /**
     * Returns a style based on validity
     *
     * :param valid: Boolien
     * :return: a string style
     */
    if (valid) {
      return "btn btn-light border border-primary mb-4";
    } else {
      return "btn btn-primary mb-4";
    }
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
    const newItems = oldItems.filter(word => word["name"] !== deletedItem);
    this.setState({
      items: newItems,
      itemsSaved: false
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
    const newGroup = event.target.elements.newGroup.value;
    const newDescription = event.target.elements.newDescription.value;

    this.state.items.push({
      description: newDescription,
      name: newItem,
      group: newGroup
    });

    // Sort this.state.items by the ['name'] key
    const sortedArray = this.state.items.sort(
      (a, b) => (a["name"].toLowerCase() > b["name"].toLowerCase() ? 1 : -1)
    );

    this.setState({
      items: sortedArray,
      itemsSaved: false
    });

    this.renewKeys();
  };

  handleGroupChange = group => {
    /**
     * Uses the given group and changes this.state.searchingByGroup to it
     *
     * :group: A string representing a group name
     */
    this.setState({
      searchingByGroup: group
    });
  };

  onSave = event => {
    /**
     * Takes the existing this.state.items and saves it as a cookie for later use
     *
     */
    const { cookies } = this.props;

    cookies.set("items", this.state.items);
    this.setState({
      itemsSaved: true
    });
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
    // Determines if this.state.items needs to be sorted by a group
    // If so sort the list
    const group = this.state.searchingByGroup;
    if (group !== "All") {
      var sortedlistItems = this.state.items.filter(item => {
        if (item["group"] === group) return item;
      });
    } else {
      var sortedlistItems = this.state.items;
    }

    // Get all items out of this.state.items and turn them into HTML elements
    let listItems = sortedlistItems.map((item, index) => {
      return [
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{item["name"]}</td>
          <td>{item["group"]}</td>
          <td>{item["description"]}</td>
        </tr>
      ];
    });

    // If listItems is empty, inform the user
    if (listItems.length === 0) {
      listItems = (
        <tr key={1}>
          <th scope="row">{"N/A"}</th>
          <td>{"No Results Found"}</td>
        </tr>
      );
    }

    // Prepare an array of items for the forms
    let formItems = this.state.items.map(item => {
      return item["name"];
    });

    return (
      <div className="list-margin my-3 bg-light border border-primary rounded">
        <div className="center">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">
                  <DropdownButton
                    handleClick={this.handleGroupChange}
                    groups={this.state.groups}
                    selectedGroup={this.state.searchingByGroup}
                  />
                </th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>{listItems}</tbody>
          </table>

          <ItemForm
            key={this.state.formKeys[0]}
            groups={this.state.groups}
            items={formItems}
            handleSubmit={this.handleItemSubmit}
          />
          <DeleteItemForm
            key={this.state.formKeys[1]}
            items={formItems}
            handleSubmit={this.handleItemDelete}
          />
        </div>
        <button
          className={this._getClassName(this.state.itemsSaved)}
          type="button"
          disabled={this.state.itemsSaved}
          onClick={this.onSave}
        >
          Save List
        </button>
      </div>
    );
  }
}
