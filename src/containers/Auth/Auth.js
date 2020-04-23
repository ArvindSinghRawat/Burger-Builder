import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import styles from "./Auth.module.css";

import { auth, setAuthRedirect } from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

export const Auth = (props) => {
   const [controls, setControls] = useState({
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
   });
   const [formIsValid, setFormIsValid] = useState(false);
   const [isSignUp, setIsSignUp] = useState(true);

   const { buildingBurger, authRedirectPath, onSetRedirectPath } = props;

   useEffect(() => {
      if (!buildingBurger && authRedirectPath !== "/") {
         onSetRedirectPath();
      }
   }, [buildingBurger, authRedirectPath, onSetRedirectPath]);

   const inputChangedHandler = (event, inputId) => {
      const updatedFormElement = updateObject(controls[inputId], {
         interacted: true,
         value: event.target.value,
         valid: checkValidity(event.target.value, controls[inputId].validation),
      });

      const updatedForm = updateObject(controls, {
         [inputId]: updatedFormElement,
      });

      setControls(updatedForm);

      const validity = checkFormIsValid(updatedForm);
      if (validity !== formIsValid) {
         setFormIsValid(validity);
      }
   };

   const checkFormIsValid = (updatedOrderForm) => {
      let formIsValid = true;
      for (let inputIdentifier in updatedOrderForm) {
         formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
      return formIsValid;
   };

   const onSubmitHandler = (event) => {
      event.preventDefault();
      props.onAuth(controls.email.value, controls.password.value, isSignUp);
   };

   const switchAuthModeSignUp = (event) => {
      event.preventDefault();
      setIsSignUp(!isSignUp);
   };
   const formElementArray = [];
   let errorMessage = null;
   let form = <Spinner />;

   if (props.isAuthenticated) {
      //console.log("[Auth.js] redirect to : ", props.authRedirectPath);
      form = <Redirect to={props.authRedirectPath} />;
   } else {
      if (props.error) {
         errorMessage = <p>{props.error.message}</p>;
      }
      if (!props.loading) {
         for (let key in controls) {
            formElementArray.push({
               id: key,
               config: controls[key],
            });
         }
         form = (
            <form onSubmit={onSubmitHandler}>
               <h1>
                  {isSignUp ? "Create New Account" : "SignIn to your Account"}
               </h1>
               <br />
               {formElementArray.map((element) => (
                  <Input
                     key={element.id}
                     name={element.id}
                     elementType={element.config.elementType}
                     elementConfig={element.config.elementConfig}
                     value={element.config.elementValue}
                     changed={(event) => inputChangedHandler(event, element.id)}
                     invalid={!element.config.valid}
                     shouldValidate={element.config.validation}
                     interacted={element.config.interacted}
                  />
               ))}
               <div className={styles.ControlGroup}>
                  <Button btnType="Success" disabled={!formIsValid}>
                     {isSignUp ? "Signup" : "Sign-In"}
                  </Button>
                  <Button btnType="Danger" clicked={switchAuthModeSignUp}>
                     Switch to {!isSignUp ? "Signup" : "Sign-In"}
                  </Button>
               </div>
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
};

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
