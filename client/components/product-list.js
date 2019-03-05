import React, {Component} from 'react'
import axios from 'axios'
import {Item, Image, Label, Button, Popup} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getProdListTC} from '../store/product'
import {addToCart} from '../store/cart'
import navbar from './navbar'

class ProductList extends Component {
  constructor() {
    super()
    this.addCartHandler = this.addCartHandler.bind(this)
  }

  componentDidMount() {
    this.props.prodListFetch()
  }

  async addCartHandler(cartItemObject) {
    console.log(cartItemObject)

    let data = {
      productId: cartItemObject.id,
      quantity: 1,
      orderId: this.props.cart.orderId
    }

    try {
      if (this.props.isLoggedIn) {
        await axios.post('api/cart', data)
      }

      let normalizedData = {quantity: 1, productInfo: cartItemObject}

      this.props.addToCart(normalizedData)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const isInCart = prodId => {
      let answer = Boolean(
        this.props.cart.find(el => {
          return el.productInfo.id === prodId
        })
      )

      return answer
    }

    const prodArr = this.props.product
    let defaultQt = 1
    const paragraph = (
      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    )
    if (prodArr) {
      return (
        <Item.Group divided>
          {prodArr.map(prod => {
            return (
              <Item key={prod.id}>
                <Item.Image src="https://dtgxwmigmg3gc.cloudfront.net/files/534e03a3c566d747b50029e3-icon-256x256.png" />

                <Item.Content>
                  <Item.Header>{prod.name}</Item.Header>

                  <Item.Meta>
                    <span>{prod.category}</span>
                  </Item.Meta>

                  <Item.Description>{paragraph}</Item.Description>

                  <Item.Extra>
                    <Label
                      icon="dollar"
                      content={`Price/LB: $${prod.price_per_pound}`}
                    />
                  </Item.Extra>

                  <Item.Extra>
                    {isInCart(prod.id) ? (
                      <Popup
                        trigger={
                          <Button color="green" icon="cart" content="In Cart" />
                        }
                        content="This item is in your cart"
                        on="click"
                        hideOnScroll
                      />
                    ) : (
                      <Button
                        color="teal"
                        content="Add To Cart"
                        icon="cart"
                        labelPosition="left"
                        onClick={() => {
                          this.addCartHandler(prod)
                        }}
                      />
                    )}
                  </Item.Extra>
                </Item.Content>
              </Item>
            )
          })}
        </Item.Group>
      )
    } else return null
  }
}

/*  

from input: 

placeholder="Quantity"
defaultValue="1" 

*/

const mapState = state => {
  return {
    product: state.productReducer.product,
    user: state.userReducer,
    isLoggedIn: !!state.userReducer.id,
    cart: state.cartReducer
  }
}

const mapDispatch = dispatch => ({
  addToCart: cartItem => dispatch(addToCart(cartItem)),
  prodListFetch: () => dispatch(getProdListTC()),
  addProd: eventData => dispatch(addProdCartTC(eventData))
})

export default connect(mapState, mapDispatch)(ProductList)
