import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MenuItem, Label, Icon, Modal, Table, Button} from 'semantic-ui-react'
import {getCartTC} from '../store/cart'

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

  render() {
    const {cart} = this.props
    const {open} = this.state
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
          <Table celled basic="very" color="teal">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Qt</Table.HeaderCell>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Price/Each</Table.HeaderCell>
                <Table.HeaderCell>Price Total</Table.HeaderCell>
                <Table.HeaderCell>Edit/Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {dummyCart.map(item => {
                return (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.qt}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{`$${item.price}`}</Table.Cell>
                    <Table.Cell>{`$${item.price * item.qt}`}</Table.Cell>
                    <Table.Cell>
                      <Button.Group>
                        <Button color="teal">Edit</Button>
                        <Button.Or />
                        <Button color="red" icon>
                          <Icon name="trash alternate" />
                        </Button>
                      </Button.Group>
                      )
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
    fetchCart: userId => dispatch(getCartTC(userId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
