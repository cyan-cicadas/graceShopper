import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'

const LoginForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const textFill = {
    signup: {
      header: 'Sign-up for an',
      button: 'Sign Up'
    },
    login: {
      header: 'Log-in to',
      button: 'Login'
    }
  }
  console.log(name)
  return (
    <div className="login-form">
      {/*
          Heads up! The styles below are necessary for the correct render of this login/signup page.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
      <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
      <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" color="teal" textAlign="center">
            {`${textFill[name].header} account`}
          </Header>
          <Form onSubmit={handleSubmit} name={name} size="large">
            <Segment stacked>
              {name === 'signup' ? (
                <div>
                  <Form.Input
                    required
                    fluid
                    placeholder
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                  />
                  <Form.Input
                    required
                    fluid
                    placeholder
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              ) : null}
              <Form.Input
                name="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              />

              <Button color="teal" fluid size="large" type="submit">
                {textFill[name].button}
              </Button>
            </Segment>
          </Form>
          {name === 'signup' ? null : (
            <Message>
              New to us? <Link to="/signup">Sign Up</Link>
            </Message>
          )}
        </Grid.Column>
      </Grid>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.userReducer.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.userReducer.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      console.log(evt.target.email.value)
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        dispatch(auth(email, password, formName, firstName, lastName))
      } else {
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(LoginForm)
export const Signup = connect(mapSignup, mapDispatch)(LoginForm)

/**
 * PROP TYPES
 */
LoginForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

// export default LoginForm
