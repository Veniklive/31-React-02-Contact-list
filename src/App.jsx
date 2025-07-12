import React, { Component } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm.jsx";

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

  render() {
    return (
      <>
        <ContactForm
          contacts={this.state.contacts}
          contactEditId={this.state.contactEditId}
          onChoice={this.choiceToEdit}
          onSubmit={this.saveContact}
          onDelete={this.deleteContact}
          onNew={this.changeOperationModeToAddition}
        />
      </>
    );
  }
}
