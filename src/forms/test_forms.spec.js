import expect from "expect";

import {
  getClassName,
  itemInArray,
  itemNotInArrayOrEmpty,
  predictWords
} from "./form_helpers.js";

/**
 * This is a test used to ensure the validity of getClassName
 *
 * We check for both a true and false condition
 */
describe("getClassName", () => {
  it("should return 'btn btn - primary'", () => {
    const className = getClassName(true);
    expect(className).toEqual("btn btn-primary");
  });

  it("should return 'btn btn-secondary'", () => {
    const className = getClassName(false);
    expect(className).toEqual("btn btn-secondary");
  });
});

/**
 * This is a test used to ensure the validity of itemInArray
 *
 * We check for both a found and notfound condition
 */
describe("itemInArray", () => {
  it("should return true", () => {
    const found = itemInArray(["cow", "sheep", "pig"], "pig");
    expect(found).toEqual(true);
  });

  it("should return false", () => {
    const found = itemInArray(["cow", "sheep", "pig"], "goat");
    expect(found).toEqual(false);
  });
});

/**
 * This is a test used to ensure the validity of itemNotInArrayOrEmpty
 *
 * We check for the following conditions:
 * 1) A blank string
 * 2) An item that is in itemArray
 * 3) Item that is neither blank or in Array
 */
describe("itemNotInArrayOrEmpty", () => {
  it("should find the blank string and return false", () => {
    const valid = itemNotInArrayOrEmpty(["cow", "sheep", "pig"], "");
    expect(valid).toEqual(false);
  });

  it("should find the the item in the array and return false", () => {
    const valid = itemNotInArrayOrEmpty(["cow", "sheep", "pig"], "pig");
    expect(valid).toEqual(false);
  });

  it("should not find the item and return true", () => {
    const valid = itemNotInArrayOrEmpty(["cow", "sheep", "pig"], "lamb");
    expect(valid).toEqual(true);
  });
});

/**
 * This is a test used to ensure the validity of predictWords
 *
 * We check for multiple results and no results
 */
describe("predictWords", () => {
  it("should return an array of strings", () => {
    const words = predictWords(["cow", "pigeon", "pig"], "pi");
    expect(words).toEqual(["pigeon", "pig"]);
  });

  it("should return false", () => {
    const words = itemInArray(["cow", "sheep", "pig"], "z");
    expect(words).toEqual(false);
  });
});
