import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import styles from "./Auth.module.css";

import { auth } from "../../store/actions/index";
import { connect } from "react-redux";

export class Auth extends Component {
  state = {
    controls: {
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
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
          autoComplete: "off",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        interacted: false,
      },
    },
    formIsValid: false,
  };

  inputChangedHandler = (event, inputId) => {
    console.log(event.target.value);
    const updatedForm = { ...this.state.controls };
    const updatedFormElement = { ...updatedForm[inputId] };
    updatedFormElement.interacted = true;
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedForm[inputId] = updatedFormElement;
    this.setState({
      controls: updatedForm,
    });
    const validity = this.checkFormIsValid(updatedForm);
    if (validity !== this.state.formIsValid) {
      this.setState({
        formIsValid: validity,
      });
    }
  };

  checkFormIsValid = (updatedOrderForm) => {
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    return formIsValid;
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

  onSubmitHandler = (event) => {
      event.preventDefault();
      this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    const form = (
      <form>
        {formElementArray.map((element) => (
          <Input
            key={element.id}
            name={element.id}
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
          LogIn
        </Button>
      </form>
    );
    return (
      <div className={styles.Auth}>
        <h1>Authentication</h1>
        <br />
        {form}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    onAuth: (email, password) => dispatch(auth(email, password)),
})

export default connect(null, mapDispatchToProps)(Auth);
