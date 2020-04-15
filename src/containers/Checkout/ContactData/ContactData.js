import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import styles from "./ContactData.module.css";

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        interacted: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        interacted: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        interacted: false,
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Postal Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        valid: false,
        interacted: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        interacted: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          defaultValue: -1,
          options: [
            {
              value: "fastest",
              display: "Fastest Delivery",
            },
            {
              value: "Cheapest",
              display: "Cheapest Delivery",
            },
          ],
        },
        value: -1,
        valid: false,
        interacted: false,
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
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

  inputChangedHandler = (event, inputId) => {
    console.log(event.target.value);
    const updatedForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedForm[inputId] };
    updatedFormElement.interacted = true;
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedForm[inputId] = updatedFormElement;
    this.setState({
      orderForm: updatedForm,
    });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }
    return isValid;
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <Aux>
        <h4>Enter your Contact Data</h4>
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map((element) => (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.elementValue}
              changed={(event) => this.inputChangedHandler(event, element.id)}
              invalid={!element.config.valid}
              shouldValidate={element.config.validation}
              interacted={element.config.interacted}
            />
          ))}
          <Button btnType="Success">Continue</Button>
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
