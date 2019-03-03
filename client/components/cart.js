import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MenuItem, Label, Icon} from 'semantic-ui-react'
import {getCartTC} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    const {fetchCart, user} = this.props
    fetchCart(user.id)
    console.dir(this.props)
  }
  render() {
    const {cart} = this.props
    console.log(cart)
    let cartQt = 0
    if (cart) {
      cartQt = cart.reduce((sum, el) => {
        return (sum += el.quantity)
      }, 0)
    }
    return (
      <MenuItem position="right">
        <Label>
          <Icon name="cart" /> {cartQt}
        </Label>
      </MenuItem>
    )
  }
}

const mapState = state => {
  return {
    user: state.userReducer,
    cart: state.cartReducer.data
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(getCartTC(userId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
