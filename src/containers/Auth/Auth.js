import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import styles from "./Auth.module.css";

import { auth, setAuthRedirect } from "../../store/actions/index";
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
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetRedirectPath();
    }
  }

  inputChangedHandler = (event, inputId) => {
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
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeSignUp = (event) => {
    event.preventDefault();
    const prevState = !this.state.isSignUp;
    this.setState({
      isSignUp: prevState,
    });
  };

  render() {
    const formElementArray = [];
    let errorMessage = null;
    let form = <Spinner />;

    if (this.props.isAuthenticated) {
      console.log("[Auth.js] redirect to : ", this.props.authRedirectPath);
      form = <Redirect to={this.props.authRedirectPath} />;
    } else {
      if (this.props.error) {
        errorMessage = <p>{this.props.error.message}</p>;
      }
      if (!this.props.loading) {
        for (let key in this.state.controls) {
          formElementArray.push({
            id: key,
            config: this.state.controls[key],
          });
        }
        form = (
          <form onSubmit={this.onSubmitHandler}>
            <h1>
              {this.state.isSignUp
                ? "Create New Account"
                : "SignIn to your Account"}
            </h1>
            <br />
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
              {this.state.isSignUp ? "Signup" : "Sign-In"}
            </Button>
            <Button btnType="Danger" clicked={this.switchAuthModeSignUp}>
              Switch to {!this.state.isSignUp ? "Signup" : "Sign-In"}
            </Button>
          </form>
        );
      }
    }
    return (
      <div className={styles.Auth}>
        {form}
        {errorMessage}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token ? true : false,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(auth(email, password, isSignUp)),
  onSetRedirectPath: () => dispatch(setAuthRedirect("/")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
