import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from "../../components/Burger/Burger"

export class BurgerBuilder extends Component {
    
    render() {
        return (
            <Aux>
                <div><Burger /></div>
                <div>Builder Controls</div>
            </Aux>
        )
    }
}

export default BurgerBuilder
