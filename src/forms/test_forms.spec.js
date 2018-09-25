import expect from "expect";

import { itemInArray, predictWords } from "./form_helpers.js";

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
