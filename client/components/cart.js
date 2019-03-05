import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {MenuItem, Label, Icon, Modal, Table, Button} from 'semantic-ui-react'
import {getCartTC, delItem, addToCart} from '../store/cart'

class Cart extends Component {
  state = {open: false}
  open = () => this.setState({open: true})
  close = () => this.setState({open: false})

  async componentDidMount() {
    const {fetchTC, user, cart} = this.props

    if (user.id) {
      await fetchTC(user.id)
      //   console.log('Cart from fetchtc ', cart)
    }
  }

  async handleDelete(cartItemId) {
    //  TODO: configure backend route for the axios call below
    // await axios.delete(`api/cart/${cartItemId}`)
    this.props.deleteItem(cartItemId)
  }

  async handleEdit(cartItemId) {
    //  TODO: configure backend route for the axios call below
    // await axios.delete(`api/cart/${cartItemId}`)
  }

  render() {
    const {cart} = this.props
    const {open} = this.state

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
                        <Button basic color="red" size="tiny" icon>
                          <Icon name="minus" />
                        </Button>
                        <Button.Or text={item.quantity} />
                        <Button basic color="green" size="tiny" icon>
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
    fetchTC: userId => dispatch(getCartTC(userId)),
    deleteItem: cartItemId => dispatch(delItem(cartItemId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
