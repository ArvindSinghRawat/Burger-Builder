import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import styles from "./ContactData.module.css";

export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Arvind",
        address: {
          street: "Teststreet 1",
          zipcode: "41532",
          country: "India",
        },
        email: "test@test.com",
      },
      deliveryMethod: "COD",
    };
    console.log(order);
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    let form = (
      <Aux>
        <h4>Enter your Contact Data</h4>
        <form>
          <Input inputtype="input" name="name" placeholder="Enter your Name" />
          <Input inputtype="input" type="email" name="email" placeholder="Enter your Email" />
          <Input inputtype="input" name="street" placeholder="Enter Street" />
          <Input inputtype="input" name="postal" placeholder="Enter Postal Code" />
          <Button btnType="Success" clicked={this.orderHandler}>
            Continue
          </Button>
        </form>
      </Aux>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={styles.ContactData}>{form}</div>;
  }
}

export default ContactData;
