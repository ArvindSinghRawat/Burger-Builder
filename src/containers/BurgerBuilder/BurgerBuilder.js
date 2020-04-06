import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from "../../components/Burger/Burger"

export class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    }

    render() {
        return (
            <Aux>
                <div><Burger ingredients={this.state.ingredients} /></div>
                <div>Builder Controls</div>
            </Aux>
        )
    }
}

export default BurgerBuilder
