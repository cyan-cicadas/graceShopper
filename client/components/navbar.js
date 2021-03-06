import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {clearCart} from '../store/cart'
import {Segment, Menu, Container, Image, Button} from 'semantic-ui-react'
import Cart from './cart'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  return (
    <div>
      <Segment
        inverted
        textAlign="center"
        style={{padding: '1em 0em'}}
        vertical
      />
      <Menu
        fixed="top"
        inverted={true}
        // pointing={!fixed}
        // secondary={!fixed}
        size="large"
      >
        {isLoggedIn ? (
          <Container>
            <Menu.Item>
              <Link to="/home" position="left">
                Home
              </Link>
            </Menu.Item>
            <Menu.Item position="left">{`Welcome, ${
              user.firstName
            }`}</Menu.Item>

            <Menu.Item position="right">
              <Cart isLoggedIn={isLoggedIn} />
            </Menu.Item>

            <Menu.Item position="right">
              <Button onClick={handleClick}>Logout</Button>
            </Menu.Item>
          </Container>
        ) : (
          <Container>
            <Link to="/home">
              <Menu.Item>Home</Menu.Item>
            </Link>

            <Menu.Item position="right">
              <Cart isLoggedIn={isLoggedIn} />
            </Menu.Item>

            <Menu.Item position="right">
              <Link to="/login">Login</Link>
            </Menu.Item>
          </Container>
        )}
      </Menu>
    </div>
  )
}
// class Navbar extends Component {
//   componentDidMount() {
//     console.dir(this.props)
//   }
//   render() {
//     const {handleClick, isLoggedIn, user} = this.props
//   }
// }

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.userReducer.id,
    user: state.userReducer
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }

//   <div>
//   <h1>BOILERMAKER</h1>
//   <nav>
//     {isLoggedIn ? (

//   {/* The navbar will show these links after you log in */}
//   <Link to="/home">Home</Link>
//   <a href="#" onClick={handleClick}>
//     Logout
//   </a>
// </div>
//     ) : (
//       <div>
//         {/* The navbar will show these links before you log in */}
//         <Link to="/login">Login</Link>
//         <Link to="/signup">Sign Up</Link>
//       </div>
//     )}
//   </nav>
//   <hr />
// </div>
