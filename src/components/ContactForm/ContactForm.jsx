import React, { Component } from "react";
import ContactList from "../ContactList/ContactList";
import style from "./ContactForm.module.css";
import { nanoid } from "nanoid";

export class ContactForm extends Component {
  state = {
    inputContact: {
      id: nanoid(),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  };

  resetState = () => {
    this.setState({
      inputContact: {
        id: nanoid(),
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
    });
  };

  onInputChange = (event) => {
    this.setState({
      inputContact: {
        ...this.state.inputContact,
        [event.target.name]: event.target.value,
      },
    });
  };

  onInputPressClear = (event) => {
    this.setState({
      inputContact: {
        ...this.state.inputContact,
        [event.target.getAttribute("name")]: "",
      },
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputContact);
    if (this.props.contactEditId === "") {
      this.resetState();
    }
  };

  onNew = (event) => {
    event.stopPropagation();
    this.props.onNew();
    this.resetState();
  };

  onDeleteInEdit = (event) => {
    event.stopPropagation();
    this.props.onDelete(this.state.inputContact.id);
    this.resetState();
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.contactEditId !== state.inputContact.id &&
      props.contactEditId !== ""
    ) {
      const contact = props.contacts.find(
        (item) => item.id === props.contactEditId
      );
      return {
        inputContact: contact,
      };
    }
    return null;
  }

  render() {
    return (
      <form className={style.contactForm} onSubmit={this.onFormSubmit}>
        <h1 className={style.formTitle}>Contact list</h1>
        <div className={style.formContainer}>
          <ul className={style.containerContacts}>
            <ContactList
              contacts={this.props.contacts}
              contactEditId={this.props.contactEditId}
              onChoice={this.props.onChoice}
              onDelete={this.props.onDelete}
            />
          </ul>
          <div className={style.containerInputs}>
            <div>
              <input
                placeholder="First name"
                name="firstName"
                type="text"
                required
                value={this.state.inputContact.firstName}
                onChange={this.onInputChange}
              />
              <span name="firstName" onClick={this.onInputPressClear}>
                X
              </span>
            </div>

            <div>
              <input
                placeholder="Last name"
                name="lastName"
                type="text"
                required
                value={this.state.inputContact.lastName}
                onChange={this.onInputChange}
              />
              <span name="lastName" onClick={this.onInputPressClear}>
                X
              </span>
            </div>
            <div>
              <input
                placeholder="Email"
                name="email"
                type="email"
                required
                value={this.state.inputContact.email}
                onChange={this.onInputChange}
              />
              <span name="email" onClick={this.onInputPressClear}>
                X
              </span>
            </div>
            <div>
              <input
                placeholder="Phone"
                name="phone"
                type="tel"
                required
                value={this.state.inputContact.phone}
                onChange={this.onInputChange}
              />
              <span name="phone" onClick={this.onInputPressClear}>
                X
              </span>
            </div>
          </div>
        </div>

        <div className={style.containerButtons}>
          <button type="button" onClick={this.onNew}>
            New
          </button>
          <div>
            <button>Save</button>
            {this.props.contactEditId !== "" && (
              <button type="button" onClick={this.onDeleteInEdit}>
                Delete
              </button>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default ContactForm;
