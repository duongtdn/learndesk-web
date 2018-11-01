"use strict"

import React, { Component } from 'react'
import auth, { isLoggedUser, getUser, logout, authGet, authPost } from '@stormgle/auth-client'

import App from './App'
import Login from './Login'
import Error from './Error'

import { parseIDsFromHref, setLocationHref } from './location-href'

import env from './env'

const endPoint = {
  login: env.ep.login,
  content: env.ep.content,
  progress: env.ep.progress
}

const link = {
  enroll: env.ln.enroll,
  account: env.ln.account,
  resetPassword: env.ln.resetPassword,
  defaultMalePicture: env.ln.dafaultMalePic
}

auth.xsite.listen();

class AppData extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null, progress: {}, user: undefined, error: null }
    this.updateProgress = this.updateProgress.bind(this);
  }

  componentWillMount() {
    auth.onStateChange( (state, user) => {
      if (state === 'authenticated') {
        Promise.all([
          this._userHasLoggedIn(),
          this._loadContentData(),
          this._loadUserProgress()
        ])
        .then(values => {
          const user = values[0];
          const data = values[1];
          const progress = values[2];
          this._changeHrefByProgress({content: data, progress})
          this.setState({user, data, progress, error: null})
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        this.setState({ user: null })
      }
    })
  }

  _userHasLoggedIn() {
    const user = getUser();
    if (!user.profile.picture) {
      user.profile.picture = link.defaultMalePicture
    }
    return Promise.resolve(user)
  }

  _loadContentData() {
    const { topicId, courseId } = parseIDsFromHref();
    const ep = `${endPoint.content}/${courseId}`;  
    return new Promise((resolve, reject) => {
      authGet({
        endPoint: ep,
        service: 'learndesk',
        onSuccess: (data) => {
          resolve(data)
        },
        onFailure: (error) => {
          reject(error.status)
        }
      })
    })
  }

  _loadUserProgress() {
    const { topicId, courseId } = parseIDsFromHref();
    const ep = `${endPoint.progress}/${courseId}`
    return new Promise((resolve, reject) => {
      authGet({
        endPoint: ep,
        service: 'learndesk',
        onSuccess: (data) => {
          resolve(data.progress)
        },
        onFailure: (error) => {
          reject(error.status)
        }
      })
    })

  }

  _changeHrefByProgress({content, progress}) {
    
    const href = window.location.href;
    const _baseUrl = href.split('#')[0];
    let  _lastTopic = 0;
    for(let i = 0; i < content.length; i++) {
      const topic = content[i];
      if (progress[topic.id]) {
        const p = progress[topic.id];
        if (Object.keys(p).length < topic.contents.length) {
          console.log(`${_baseUrl}#${topic.id}`)
          setLocationHref(`${_baseUrl}#${topic.id}`)
          return topic.id
        } else if (Object.keys(p).length === topic.contents.length) {
          _lastTopic = i;
        }
      } else if (_lastTopic > 0) {
        console.log(`${_baseUrl}#${topic.id}`)
        setLocationHref(`${_baseUrl}#${topic.id}`)
        return topic.id
      }
    }

  }

  render() {
    if (this.state.user === undefined) {
      return null
    } else {
      const _display = this.decideDisplayPage();
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
          <Error  naviLink = {link.enroll}
                  display = {_display.error}
                  errCode = {this.state.error}
                  user = {this.state.user}
                  logout = {() => this.logout()}
          />
        </div>
      )
    }
  }

  decideDisplayPage() {
    const _display = {
      app: 'none',
      login: 'none',
      error: 'none',
    }

    if (!this.state.user) {
      _display.login = 'block';
      return _display
    }

    if (this.state.error) {
      _display.error = 'block';
      return _display
    }

    _display.app = 'block';
    return _display

  }

  onUserLoggedIn(user) {
    
  }

  logout() {
    logout();
  }

  updateProgress({topicId, contentId}) {
    const progress = this.state.progress;

    // not update if progress is not change
    if (progress[topicId] && progress[topicId][contentId]) {
      console.log('do not need to update progress')
      return
    }

    if (!progress[topicId]) {
      progress[topicId] = {};
    }
    progress[topicId][contentId] = true;
    this.setState({ progress });

    const _id = parseIDsFromHref();
    const ep = `${endPoint.progress}/${_id.courseId}`
    authPost({
      endPoint: ep,
      service: 'learndesk',
      data: { progress },
      onSuccess: (data) => {
        console.log('updated progress to server')
      },
      onFailure: (error) => {
        // this.setState({ error : error.status })
      }
    })
  }
}

export default AppData
