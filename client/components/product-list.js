import React, {Component} from 'react'
import {Item} from 'semantic-ui-react'
import Axios from 'axios'

class ProductList extends Component {
  render() {
    return <Item.Group divided />
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

export default ProductList
