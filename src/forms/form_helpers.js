/**
 * Various helper functions for the forms live here.
 */

export function getClassName(valid) {
  /**
   * Returns a style based on validity
   *
   * :param valid: Boolien
   * :return: a string style intended for a className
   */
  if (valid) {
    return "btn btn-primary";
  } else {
    return "btn btn-secondary";
  }
}

export function itemInArray(itemList, item) {
  /**
   * Checks to see if an item is empty or in self.state.items
   *
   * :param itemList: An array of items to check if it contains item
   * :param item: String value of an item
   * :return : Boolien true if found/ false if not
   */

  if (itemList.includes(item)) {
    return true;
  }
  return false;
}

export function itemNotInArrayOrEmpty(itemArray, item) {
  /**
   * Checks to see if an item is empty or in itemArray
   * This is a case-insensitive search
   *
   * :param itemArray: An array used to check if item is in it
   * :param item: String value of an item
   * :return : Boolien True if not empty or in self.state.items
   */

  if (item === "") {
    return false;
  }

  // lower cases itemArray to make it case insensitive
  const lowerCasedItemArray = itemArray.map(item => {
    return item.toLowerCase();
  });

  if (lowerCasedItemArray.includes(item.toLowerCase())) {
    return false;
  }
  return true;
}

export function predictWords(possibleWords, word) {
  /**
   * Uses props.items to predict what word the user will type next
   *
   * :param possibleWords: An array of words used to find what
   * could be suggested to the user
   * :event: takes a standard event value
   * :return : An array of matched words or false
   */
  const userWordLength = word.length;

  const matchedWords = possibleWords.filter(
    item => item.slice(0, userWordLength) === word
  );

  return matchedWords;
}
