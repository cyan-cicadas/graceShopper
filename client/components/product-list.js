import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Item} from 'semantic-ui-react'
import Axios from 'axios'
import {getProdListTC} from '../store/product'

class ProductList extends Component {
  // componentDidMount() {
  //     this.props.prodListFetch(   )
  // }
  render() {
    this.props.prodListFetch()
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
  prodListFetch: () => dispatch(getProdListTC)
})

export default connect(mapState, mapDispatch)(ProductList)
