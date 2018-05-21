"use strict"

import React, { Component } from 'react'
import { isLoggedUser, getUser, logout } from '@stormgle/auth-client'

import App from './App'
import Login from './Login'

import { parseIDsFromHref } from './location-href'

const progress = {}

const data = [
  {
    id: '1', 
    title: 'Topic 1 is the first topic, id define topic number',
    contents: [
      {
        id: 0, player: 'YOUTUBE', src: 'X6a9odk6b_c', title: 'Nick and Dave Conversation',
        sub: {
          0: {
            id: 0, player: 'QUIZ', src: 'quiz1', title: 'Quiz 1 for test',
            sub: {0: {id: 0, player: 'QUIZ', src: 'quiz2', title: 'Quiz 2 for test',}}
          },
        }
      },
      {
        id: 1, player: 'YOUTUBE', src: 'r6bkETisayg', title: 'How to make friend and infulence people',
      },
    ]
  },
  {
    id: '1a', 
    title: 'Topic 1 is the first topic, id define topic number',
    contents: [
      {id: 0, player: 'QUIZ', src: 'quiz1', title: 'Quiz for test'},
    ]
  },
  {
    id: '2', 
    title: 'The second one, whatever name can be used',
    contents: [
      {id: 0, player: 'YOUTUBE', src: 'X6a9odk6b_c', title: 'Games of Thrones theme song: piano cover '},
      {id: 1, player: 'YOUTUBE', src: 'XQMnT9baoi8', title: 'Dragonborn is comming: piano cover'},
      {id: 3, player: 'YOUTUBE', src: 'dUNm721wTec', title: 'Age of agression'},
    ]
  },
  {
    id: '3', 
    title: 'Name should not too long',
    contents: [
      {id: 0, player: 'YOUTUBE', src: 'R9ZE97rnBqE', title: 'Nick and Dave Conversation'},
      {id: 1, player: 'YOUTUBE', src: 'r6bkETisayg', title: 'The last storyline'},
    ]
  }
]

class AppData extends Component {
  constructor(props) {
    super(props);
    this.state = { data, progress, user: null }
    this.updateProgress = this.updateProgress.bind(this);
  }

  componentWillMount() {
    console.log(parseIDsFromHref());
    if (isLoggedUser()) {
      const user = getUser();
      this.setState({ user })
    }
  }

  render() {
    if (this.state.user) {
      return (
        <App  data = {this.state.data}
              progress = {this.state.progress}
              onCompletedContent = {this.updateProgress}
              user = {this.state.user}
              logout={() => this.logout()}
        />
      )
    } else {
      return (
        <Login endPoint = 'http://localhost:3100/auth/login'
               onUserLoggedIn = {user => this.onUserLoggedIn(user)} />
      )
    }
  }

  onUserLoggedIn(user) {
    this.setState({ user })
  }

  logout() {
    logout();
    this.setState({ user: null })
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
