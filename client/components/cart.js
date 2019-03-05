import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {MenuItem, Label, Icon, Modal, Table, Button} from 'semantic-ui-react'
import {getCartTC, delItem} from '../store/cart'

class Cart extends Component {
  state = {open: false}
  open = () => this.setState({open: true})
  close = () => this.setState({open: false})

  componentDidMount() {
    const {fetchCart, user} = this.props
    console.log(user.id)
    fetchCart(user.id)
    console.dir(this.props)
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
    console.dir(this.props)
    let cartQt = 0
    if (cart) {
      cartQt = cart.reduce((sum, el) => {
        return (sum += el.quantity)
      }, 0)
    }

    const dummyCart = [
      {
        id: 1,
        qt: 3,
        name: 'Bone-In Porterhouse, 14 oz',
        price: 18.99
      },
      {
        id: 2,
        qt: 2,
        name: 'Tomahawk Ribeye, 24 oz',
        price: 48.99
      },
      {
        id: 3,
        qt: 1,
        name: 'Checken Liver, 12 oz.',
        price: 9.99
      }
    ]

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
              {cart.map(item => {
                return (
                  <Table.Row key={item.id}>
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
    fetchCart: userId => dispatch(getCartTC(userId)),
    deleteItem: cartItemId => dispatch(delItem(cartItemId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
