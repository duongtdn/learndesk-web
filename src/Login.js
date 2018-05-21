"use strict"

import React, { Component } from 'react'

import { loginByPassword, isLoggedUser, isEmail } from '@stormgle/auth-client'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', error: 'You need to login to use the service' }

    this.login = this.login.bind(this)
  }

  render() {
    return (
      <div  >

        <div className="w3-bar w3-black" style={{fontFamily: 'Caveat', fontSize: '22px'}}>
          <a href="#" className="w3-bar-item w3-button w3-border-right">Learn <span className="w3-text-blue">Desk</span></a>
        </div>

        <div className="w3-border" style={{maxWidth: '600px', margin: '32px auto'}} >

          <div className="w3-container w3-blue" style={{marginBottom: '16px'}}>
            <h4> Login </h4>
          </div>

          <div className="w3-container w3-text-red" style={{}}>
            <p> {this.state.error} </p>
          </div>

          <div className="w3-container" style={{marginTop: '32px'}}>
            <p>
              <label>Email</label>
              <input className="w3-input" type="text" 
                    value={this.state.email}
                    onChange={evt => this.handleEmailInput(evt)}
                    onKeyUp={evt => this.handleEmailKeyUp(evt)}
              />
            </p>

            <p>
              <label>Password</label>
              <input className="w3-input" type="password" 
                    value={this.state.password}
                    onChange={evt => this.handlePasswordInput(evt)}
                    onKeyUp={evt => this.handlePasswordKeyUp(evt)}
              />
            </p>

            <div style={{padding: '32px 0'}}>
              <button className="w3-button w3-blue" onClick={this.login}> Login </button>
              <button className="w3-button w3-text-orange w3-right"> Create an account </button>
            </div>

            <label className="w3-text-blue"> Forget password, click here </label>

            <div style={{marginBottom: '32px'}} />

          </div>

        </div>

      </div>
    )
  }

  handleEmailInput(evt) {
    const email = evt.target.value;
    const error = email.length === 1 ? 'You need to login to use the service' : this.state.error; 
    this.setState({ email, error })
  }

  handlePasswordInput(evt) {
    const password = evt.target.value;
    this.setState({ password })
  }

  login() {

    if (this.state.email.length === 0) {
      this.setState({error: 'Email must not be empty'});
      return
    }

    if (!isEmail(this.state.email)) {
      this.setState({error: 'Invalid email format'});
      return
    }

    if (this.state.password.length === 0) {
      this.setState({error: 'Password must not be empty'});
      return
    }

    const username = this.state.email;
    const password = this.state.password;

    loginByPassword(
      this.props.endPoint, 
      { username, password },
      {
        onSuccess: (user) => {
          this.props.onUserLoggedIn(user)
        },
        onFailure: (error) => {
          this.setState({ error: JSON.parse(error).error })
        }
      }
      
    )

  }

  handleEmailKeyUp(evt) {
    if (evt.which === 13 || evt.keyCode === 13) {
      this.login()
    }
  }

  handlePasswordKeyUp(evt) {
    if (evt.which === 13 || evt.keyCode === 13) {
      this.login()
    }
  }

}

export default Login