import React, {Component} from 'react'
import {Item, Image, Label} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getProdListTC} from '../store/product'

class ProductList extends Component {
  componentDidMount() {
    this.props.prodListFetch()
  }
  render() {
    console.log(this.props.product, 'product-list.js:11')
    const prodArr = this.props.product
    const paragraph = (
      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    )
    if (prodArr) {
      return (
        <Item.Group divided>
          {prodArr.map(prod => {
            return (
              <Item>
                <Item.Image src="https://dtgxwmigmg3gc.cloudfront.net/files/534e03a3c566d747b50029e3-icon-256x256.png" />
                <Item.Content>
                  <Item.Header>{prod.name}</Item.Header>
                  <Item.Meta>
                    <span>{prod.category}</span>
                  </Item.Meta>
                  <Item.Description>{paragraph}</Item.Description>
                  <Item.Extra>
                    <Label>{`Price/LB: $${prod.price_per_pound}`}</Label>
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

const mapState = state => {
  return {
    product: state.productReducer.product
  }
}

const mapDispatch = dispatch => ({
  prodListFetch: () => dispatch(getProdListTC())
})

export default connect(mapState, mapDispatch)(ProductList)
