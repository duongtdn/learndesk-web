"use strict"

import React, { Component } from 'react'
import auth, { isLoggedUser, getUser, logout, authGet } from '@stormgle/auth-client'

import App from './App'
import Login from './Login'

import { parseIDsFromHref } from './location-href'

const endPoint = {
  login: 'http://localhost:3100/auth/login',
  content: 'http://localhost:3301/content/emb-01'
}

const progress = {}

class AppData extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null, progress, user: null, error: null }
    this.updateProgress = this.updateProgress.bind(this);
  }

  componentWillMount() {
    console.log(parseIDsFromHref());
    auth.onStateChange( (state, user) => {
      if (state === 'authenticated') {
        this._userHasLoggedIn()._loadContentData();
      } else {
        this.setState({ user: null })
      }
    })
  }

  _userHasLoggedIn() {
    const user = getUser();
    this.setState({ user });
    return this;
  }

  _loadContentData() {
    /* authGet to be implemented in auth-client package */
    authGet({
      endPoint: endPoint.content,
      service: 'content',
      onSuccess: (data) => {
        this.setState({ data })
      },
      onFailure: (error) => {
        this.setState({ error })
      }
    })
    
    return this;
  }

  render() {
    const _display = {
      app: this.state.user? 'block' : 'none',
      login: this.state.user? 'none' : 'block'
    }
    return (
      <div>
        <App  data = {this.state.data}
              progress = {this.state.progress}
              onCompletedContent = {this.updateProgress}
              user = {this.state.user}
              logout = {() => this.logout()}
              display = {_display.app}
        />
        <Login endPoint = {endPoint.login}
               onUserLoggedIn = {user => this.onUserLoggedIn(user)} 
               display = {_display.login}
        />
      </div>
    )
  }

  onUserLoggedIn(user) {
    // this.setState({ user })
  }

  logout() {
    logout();
  }

  updateProgress({topicId, contentId}) {
    if (!progress[topicId]) {
      progress[topicId] = {};
    }
    progress[topicId][contentId] = true;
    this.setState({ progress })
  }
}

export default AppData
