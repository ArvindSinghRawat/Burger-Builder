import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import * as actions from "../../../store/actions/index";

import styles from "./ContactData.module.css";

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

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
        value: "fastest",
        valid: false,
        interacted: false,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  checkFormIsValid = (updatedOrderForm) => {
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    return formIsValid;
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
    const validity = this.checkFormIsValid(updatedForm);
    if (validity !== this.state.formIsValid) {
      this.setState({
        formIsValid: validity,
      });
    }
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== "" && isValid;
      }
      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }
      if (rules.maxLength) {
        isValid = value.length <= rules.minLength && isValid;
      }
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
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            Continue
          </Button>
        </form>
      </Aux>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return <div className={styles.ContactData}>{form}</div>;
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
