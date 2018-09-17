import React from "react";

import "./styles.css";

/**
 * An about page template
 */
export default class List extends React.Component {
  render() {
    return (
      <div className="paragraph-70-width">
        <h3>React Shopping List</h3>
        <p>
          This is a shopping list application where the user can add and delete
          items from a shopping list<br />with automated assistance.
        </p>
        <h3>Features include</h3>
        <ul>
          <li>
            Automated suggestions and handling of user input. This includes
            predicting items to delete, preventing invalid letters from being
            typed, and when a new item can be submitted.
          </li>
          <li>Reusable components</li>
          <li>React router routing</li>
        </ul>
        <p>&nbsp;</p>
      </div>
    );
  }
}
