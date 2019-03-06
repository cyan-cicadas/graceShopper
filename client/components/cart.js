import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {MenuItem, Label, Icon, Modal, Table, Button} from 'semantic-ui-react'
import {getCartTC, delItem, addToCart, changeCount} from '../store/cart'

class Cart extends Component {
  state = {open: false}
  open = () => this.setState({open: true})
  close = () => this.setState({open: false})

  componentDidMount() {
    const {fetchCart, user} = this.props
    console.dir(this.props)

    if (user.id) {
      fetchCart(user.id)
    }
  }

  async handleDelete(cartItemId) {
    //  TODO: configure backend route for the axios call below
    // await axios.delete(`api/cart/${cartItemId}`)
    this.props.deleteItem(cartItemId)
  }

  async handleEdit(eventProps) {
    const {isLoggedIn, chngeCount} = this.props
    if (isLoggedIn) {
      //  TODO: configure backend route for the axios call below
      // await axios.delete(`api/cart/${cartItemId}`)
    }
    const {type, prodid} = eventProps
    const payload = {type, prodid}
    console.log(prodid)
    chngeCount(payload)
  }

  render() {
    const {cart} = this.props
    const {open} = this.state

    // console.dir(this.props)

    let cartQt = 0

    if (cart) {
      cartQt = cart.reduce((sum, el) => {
        return (sum += el.quantity)
      }, 0)
    }

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        trigger={
          <Label>
            <Icon name="cart" /> {cartQt}
          </Label>
        }
      >
        <Modal.Header>Your Cart</Modal.Header>
        <Modal.Content>
          <Table celled basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Price/Each</Table.HeaderCell>
                <Table.HeaderCell>Price Total</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Qt</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Remove</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {cart.map((item, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell>{item.productInfo.name}</Table.Cell>
                    <Table.Cell>{`$${
                      item.productInfo.price_per_pound
                    }`}</Table.Cell>

                    <Table.Cell>{`$${item.productInfo.price_per_pound *
                      item.quantity}`}</Table.Cell>

                    <Table.Cell textAlign="center">
                      <Button.Group>
                        <Button
                          prodid={item.productInfo.id}
                          type="-"
                          basic
                          color="red"
                          size="tiny"
                          onClick={(e, data) => this.handleEdit(data)}
                          icon
                        >
                          <Icon name="minus" />
                        </Button>
                        <Button.Or text={item.quantity} />
                        <Button
                          prodid={item.productInfo.id}
                          type="+"
                          basic
                          color="green"
                          size="tiny"
                          onClick={(e, data) => this.handleEdit(data)}
                          icon
                        >
                          <Icon name="plus" />
                        </Button>
                      </Button.Group>
                    </Table.Cell>

                    <Table.Cell textAlign="center">
                      <Button negative icon onClick={this.handleDelete}>
                        <Icon name="trash alternate" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={this.close}>
            Back
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Checkout"
            onClick={this.close}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapState = state => {
  return {
    user: state.userReducer,
    cart: state.cartReducer
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(getCartTC(userId)),
    deleteItem: cartItemId => dispatch(delItem(cartItemId)),
    chngeCount: payload => dispatch(changeCount(payload))
  }
}

export default connect(mapState, mapDispatch)(Cart)
