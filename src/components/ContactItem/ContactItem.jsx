import React, { Component } from "react";
import style from "./ContactItem.module.css";

export class ContactItem extends Component {
  onContactDelete = (event) => {
    event.stopPropagation();
    this.props.onDelete(this.props.contact.id);
  };

  render() {
    return (
      <li
        onDoubleClick={() => this.props.onChoice(this.props.contact.id)}
        className={
          style.containerContactItem +
          " " +
          (this.props.contactEditId == this.props.contact.id ? style.edit : "")
        }
      >
        <p>
          {this.props.contact.firstName} {this.props.contact.lastName}
        </p>
        <button onClick={this.onContactDelete}>X</button>
      </li>
    );
  }
}

export default ContactItem;
