import React, { Component } from "react";
import style from "./ContactItem.module.css";

export class ContactItem extends Component {
  onContactDelete = (event) => {
    event.stopPropagation();
    this.props.onDelete(this.props.contact.id);
  };

  render() {
    const { id, firstName, lastName } = this.props.contact;
    const { onChoice } = this.props;
    return (
      <li
        onDoubleClick={() => onChoice(id)}
        className={
          style.containerContactItem +
          " " +
          (this.props.contactEditId == id ? style.edit : "")
        }
      >
        <p>
          {firstName} {lastName}
        </p>
        <button onClick={this.onContactDelete}>X</button>
      </li>
    );
  }
}

export default ContactItem;
