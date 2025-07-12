import React, { Component } from "react";
import ContactItem from "../ContactItem/ContactItem";

export class ContactList extends Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

export default ContactList;
