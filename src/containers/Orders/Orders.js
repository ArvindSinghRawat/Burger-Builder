import React, { Component } from "react";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import Order from "../../components/Order/Order";

export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/order")
      .then((response) => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        this.setState({
          loading: false,
          orders: fetchedOrders,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
