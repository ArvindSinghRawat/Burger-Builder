import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";

import styles from "./ContactData.module.css";

export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };
  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="Enter your Name" />
          <input type="email" name="email" placeholder="Enter your Email" />
          <input type="text" name="street" placeholder="Enter Street" />
          <input type="text" name="postal" placeholder="Enter Postal Code" />
          <Button btnType="Success" />
        </form>
      </div>
    );
  }
}

export default ContactData;
