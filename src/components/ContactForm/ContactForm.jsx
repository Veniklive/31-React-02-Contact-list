import React, { Component } from "react";
import style from "./ContactForm.module.css";
import { nanoid } from "nanoid";

export class ContactForm extends Component {
  state = {
    inputContact: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  };

  resetState = () => {
    this.setState({
      inputContact: {
        id: "",
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
    this.props.onSubmit({
      ...this.state.inputContact,
      id:
        this.state.inputContact.id === ""
          ? nanoid()
          : this.state.inputContact.id,
    });
    if (this.props.contact.id === "") {
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
    if (props.contact === undefined) {
      return null;
    }
    if (props.contact.id !== state.inputContact.id) {
      return {
        inputContact: props.contact,
      };
    }
    return null;
  }

  render() {
    return (
      <>
        <form onSubmit={this.onFormSubmit}>
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

          <div className={style.containerButtons}>
            <button type="button" onClick={this.onNew}>
              New
            </button>
            <div>
              <button>Save</button>
              {this.state.inputContact.id !== "" && (
                <button type="button" onClick={this.onDeleteInEdit}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default ContactForm;
