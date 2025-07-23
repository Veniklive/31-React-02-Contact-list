import React, { Component } from "react";
import ContactItem from "../ContactItem/ContactItem";
import style from "./ContactList.module.css";

export class ContactList extends Component {
  render() {
    return (
      <>
        <ul className={style.containerContacts}>
          {this.props.contacts.map((contact) => {
            return (
              <ContactItem
                contactEditId={this.props.contactEditId}
                key={contact.id}
                contact={contact}
                onChoice={this.props.onChoice}
                onDelete={this.props.onDelete}
              />
            );
          })}
        </ul>
      </>
    );
  }
}

export default ContactList;
