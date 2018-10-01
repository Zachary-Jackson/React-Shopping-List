import React from "react";

import "../styles.css";

/**
 * An about page template which is the same as the README.md
 */
export default class List extends React.Component {
  render() {
    return (
      <div className="paragraph-width my-3 bg-light border border-primary rounded">
        <p>
          This is a shopping list application where the user can add and delete
          items from a shopping list with automated assistance.
        </p>

        <h2>Usage tips</h2>
        <ul>
          <li>
            Use the Tab key to quickly go to the next element in the form.
          </li>
        </ul>

        <h2>Features include</h2>
        <ul>
          <li>
            Automated suggestions and handling of user input. This includes
            predicting items to delete, preventing invalid letters from being
            typed, and when a new item can be submitted.
          </li>
          <li>Setting browser cookies to save the user's list</li>
          <li>Reusable components</li>
          <li>React router routing</li>
        </ul>

        <h2>Technologies used</h2>
        <ul>
          <li>Bootstrap 4</li>
          <li>React-Cookie</li>
          <li>React-Router</li>
        </ul>
      </div>
    );
  }
}
