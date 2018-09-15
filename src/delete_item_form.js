import React from "react";

/**
 * This is a text form component that allows a user to sumbit items found in props.items
 * It uses predictive searching to assist the user in selecting an item
 *
 * :prop items: An array of items that can be deleted
 * :prop handleSubmit: A function that will get called whith a valid form
 */
export default class DeleteItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Please enter some an item to delete",
      predictedWord: null,
      valid: true,
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
        message: "Please enter some an item to delete"
      });
    }
  }

  itemValid(item) {
    /**
     * Checks to see if an item is empty or in self.state.items
     *
     * :param item: String value of an item
     * :return : Boolien True if found
     */

    if (this.props.items.includes(item)) {
      return true;
    }
  }

  handleChange = event => {
    /**
     * Sets the state of newItemInput/newItemValid
     *
     * :event: takes a standard event value
     */

    const predictableWords = this.predictWord(event.target.value);
    const valid = this.itemValid(event.target.value);

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

  predictWord = word => {
    /**
     * Uses props.items to predict what word the user will type next
     *
     * :event: takes a standard event value
     */
    const userWordLength = word.length;
    const possibleWords = this.props.items;

    const matchedWords = possibleWords.filter(
      item => item.slice(0, userWordLength) === word
    );

    return matchedWords;
  };

  render() {
    /* Renders a text form */

    return (
      <form className="vertical-padding" onSubmit={this.props.handleSubmit}>
        <label>
          <div>{this.state.message}</div>
          Delete:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            name="deletedItem"
          />
        </label>
        <input type="submit" value="Submit" disabled={!this.state.itemValid} />
      </form>
    );
  }
}
