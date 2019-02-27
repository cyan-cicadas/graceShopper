import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import LandingGrid from './components/landing-grid'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <LandingGrid />
    </div>
  )
}

export default App
