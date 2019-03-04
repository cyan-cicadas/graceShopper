import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import LandingGrid from './components/landing-grid'
import ProductList from './components/product-list'

const App = () => {
  return (
    <div>
      <Navbar /> 
      <Routes />
      <LandingGrid />
      <ProductList />
    </div>
  )
}
//  Comment for git

export default App
