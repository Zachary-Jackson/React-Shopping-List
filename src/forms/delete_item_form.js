import React from "react";
import PropTypes from "prop-types";

import { getClassName, itemInArray, predictWords } from "./form_helpers.js";

/**
 * This is a text form component that allows a user to sumbit items found in props.items
 * It uses predictive searching to assist the user in selecting an item
 */
export default class DeleteItemForm extends React.Component {
  static propTypes = {
    /** Items that the user can submit */
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** A function that will get called with a valid form */
    handleSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      /** The help message showing the user the input predictions */
      message: "Please enter an item to delete",
      /** Changes whether or not the input button is valid */
      valid: true,
      /** The input form's value */
      value: ""
    };
  }

  createMessage(wordList, word) {
    /**
     * Depending on the wordList and word, create an appropriate
     * message for the user in self.state.message
     *
     * :param wordList: An array of words
     * :param word: A Word string
     */
    if (word !== "") {
      if (wordList.length === 1) {
        this.setState({
          message: `You can delete the word ${wordList[0]}.`
        });
      } else if (wordList.length > 1) {
        this.setState({
          message: `Words you can delete include ${wordList.slice(0, 3)}.`
        });
      }
    } else {
      this.setState({
        message: "Please enter an item to delete"
      });
    }
  }

  handleChange = event => {
    /**
     * Sets the state of newItemInput/newItemValid
     *
     * :event: takes a standard event value
     */

    const predictableWords = predictWords(this.props.items, event.target.value);
    const valid = itemInArray(this.props.items, event.target.value);

    if (predictableWords.length !== 0) {
      this.setState({
        value: event.target.value
      });

      this.setState({
        itemValid: valid
      });
    }

    this.createMessage(predictableWords, event.target.value);
  };

  render() {
    /* Renders a text form */
    const valid = this.state.itemValid;

    return (
      <form className="py-2" onSubmit={this.props.handleSubmit}>
        <div>{this.state.message}</div>

        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          name="deletedItem"
          placeholder="Remove item"
        />

        <input
          autoComplete="off"
          className={getClassName(valid)}
          type="submit"
          value="Delete"
          disabled={!valid}
        />
      </form>
    );
  }
}
