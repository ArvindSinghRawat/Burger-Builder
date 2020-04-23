import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

import styles from "./ContactData.module.css";

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

export const ContactData = (props) => {
   const [orderForm, setOrderForm] = useState({
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
   });

   const [isFormValid, setIsFormValid] = useState(false);

   const orderHandler = (event) => {
      event.preventDefault();

      const formData = {};
      for (let formElementId in orderForm) {
         formData[formElementId] = orderForm[formElementId].value;
      }

      const order = {
         ingredients: props.ingredients,
         price: props.totalPrice,
         orderData: formData,
         userId: props.userId,
      };

      props.onOrderBurger(order, props.token);
   };

   const checkFormIsValid = (updatedOrderForm) => {
      let formIsValid = true;
      for (let inputIdentifier in updatedOrderForm) {
         formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
      return formIsValid;
   };

   const inputChangedHandler = (event, inputId) => {
      const updatedFormElement = updateObject(orderForm[inputId], {
         interacted: true,
         value: event.target.value,
         valid: checkValidity(
            event.target.value,
            orderForm[inputId].validation
         ),
      });
      const updatedForm = updateObject(orderForm, {
         [inputId]: updatedFormElement,
      });

      setOrderForm(updatedForm);

      const validity = checkFormIsValid(updatedForm);
      if (validity !== isFormValid) {
         setIsFormValid(validity);
      }
   };

   const formElementsArray = [];
   for (let key in orderForm) {
      formElementsArray.push({
         id: key,
         config: orderForm[key],
      });
   }
   let form = (
      <Aux>
         <h4>Enter your Contact Data</h4>
         <form onSubmit={orderHandler}>
            {formElementsArray.map((element) => (
               <Input
                  key={element.id}
                  elementType={element.config.elementType}
                  elementConfig={element.config.elementConfig}
                  value={element.config.elementValue}
                  changed={(event) => inputChangedHandler(event, element.id)}
                  invalid={!element.config.valid}
                  shouldValidate={element.config.validation}
                  interacted={element.config.interacted}
               />
            ))}
            <Button btnType="Success" disabled={!isFormValid}>
               Continue
            </Button>
         </form>
      </Aux>
   );
   if (props.loading) {
      form = <Spinner />;
   }
   return <div className={styles.ContactData}>{form}</div>;
};

const mapStateToProps = (state) => ({
   ingredients: state.burgerBuilder.ingredients,
   totalPrice: state.burgerBuilder.totalPrice,
   loading: state.order.loading,
   token: state.auth.token,
   userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
   onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(ContactData, axios));
