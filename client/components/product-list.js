import React, {Component} from 'react'
import axios from 'axios'
import {Item, Image, Label, Input} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getProdListTC, addProdCartTC} from '../store/product'
import navbar from './navbar'

class ProductList extends Component {
  handleInputChange(e) {
    this.setState({
      tempQt: e.target.value
    })
  }
  componentDidMount() {
    this.props.prodListFetch()
  }
  render() {
    console.log(this.props.product, 'product-list.js:11')
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
                  <Input
                    onChange={e => (defaultQt = e.target.value)}
                    action={{
                      color: 'teal',
                      labelPosition: 'left',
                      icon: 'cart',
                      content: 'Add to Cart',
                      onClick: async () => {
                        const {data: user} = await axios.get('auth/me')
                        if (!user) {
                          alert('Please login or signup')
                        } else {
                          console.log(prod, defaultQt)
                        }
                      }
                    }}
                    actionPosition="left"
                    placeholder="Quantity"
                    defaultValue="1"
                    size="mini"
                  />
                </Item.Content>
              </Item>
            )
          })}
        </Item.Group>
      )
    } else return null
  }
}

const mapState = state => {
  return {
    product: state.productReducer.product
  }
}

const mapDispatch = dispatch => ({
  prodListFetch: () => dispatch(getProdListTC()),
  addProd: eventData => dispatch(addProdCartTC(eventData))
})

export default connect(mapState, mapDispatch)(ProductList)
