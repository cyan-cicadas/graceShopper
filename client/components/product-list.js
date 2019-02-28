import React, {Component} from 'react'
import {Item} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getProdListTC} from '../store/product'

class ProductList extends Component {
  componentDidMount() {
    this.props.prodListFetch()
  }
  render() {
    console.log(this.props)
    return <Item.Group divided />
  }
}

const mapState = state => {
  return {
    product: state.productReducer
  }
}

const mapDispatch = dispatch => ({
  prodListFetch: () => dispatch(getProdListTC())
})

export default connect(mapState, mapDispatch)(ProductList)
