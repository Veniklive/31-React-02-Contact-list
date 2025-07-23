import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import style from "./App.module.css";

import ContactList from "./components/ContactList/ContactList";

export default class App extends Component {
  state = {
    contactEditId: "",
    contacts: [],
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    if (!contacts) {
      this.setState({ contacts: [] });
    } else {
      this.setState({ contacts: [...contacts] });
    }
  }

  changeOperationModeToAddition = () => {
    this.setState({
      contactEditId: "",
    });
  };

  choiceToEdit = (id) => {
    this.setState({
      contactEditId: id,
    });
  };

  saveContact = (contact) => {
    this.setState((state) => {
      if (state.contactEditId === "") {
        const contacts = [...state.contacts, contact];
        this.saveContactsInLocalStorage(contacts);
        return { contacts, contactEditId: "" };
      } else {
        const contacts = state.contacts.map((item) =>
          item.id === contact.id ? { ...contact } : item
        );
        this.saveContactsInLocalStorage(contacts);
        return {
          contacts,
        };
      }
    });
  };

  deleteContact = (id) => {
    this.setState((state) => {
      const contacts = [
        ...state.contacts.filter((contact) => contact.id !== id),
      ];
      this.saveContactsInLocalStorage(contacts);
      return { contacts, contactEditId: "" };
    });
  };

  saveContactsInLocalStorage = (newState) => {
    localStorage.setItem(`contacts`, JSON.stringify(newState));
  };

  getContact = () => {
    const contact = this.state.contacts.filter(
      (contact) => contact.id === this.state.contactEditId
    )[0];
    if (contact) {
      return contact;
    } else {
      return {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      };
    }
  };

  render() {
    return (
      <>
        <div className={style.contactList} onSubmit={this.onFormSubmit}>
          <h1 className={style.title}>Contact list</h1>
          <div className={style.flexContainer}>
            <ContactList
              contacts={this.state.contacts}
              contactEditId={this.state.contactEditId}
              onChoice={this.choiceToEdit}
              onDelete={this.deleteContact}
            />
            <ContactForm
              contact={this.getContact()}
              onSubmit={this.saveContact}
              onDelete={this.deleteContact}
              onNew={this.changeOperationModeToAddition}
            />
          </div>
        </div>
      </>
    );
  }
}
