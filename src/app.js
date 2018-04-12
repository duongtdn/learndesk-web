"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import style from './css/app.css'

import Header from './Header'
import ContentPlayer from './ContentPlayer'
import ContentList from './ContentList'

const topics = [
  {
    id: 1, 
    name: 'Topic 1 is the first topic, id define topic number',
    contents: [
      {id: 0, player: 'YOUTUBE', src: 'R9ZE97rnBqE', name: 'Nick and Dave Conversation'},
      {id: 1, player: 'YOUTUBE', src: 'r6bkETisayg', name: 'How to make friend and infulence people'},
    ]
  },
  {
    id: 2, 
    name: 'The second one, whatever name can be used',
    contents: [
      {id: 0, player: 'YOUTUBE', src: 'X6a9odk6b_c', name: 'Games of Thrones theme song: piano cover '},
      {id: 1, player: 'YOUTUBE', src: 'XQMnT9baoi8', name: 'Dragonborn is comming: piano cover'},
      {id: 3, player: 'YOUTUBE', src: 'dUNm721wTec', name: 'Age of agression'},
    ]
  },
  {
    id: 3, 
    name: 'Name should not too long',
    contents: [
      {id: 0, player: 'YOUTUBE', src: 'R9ZE97rnBqE', name: 'Nick and Dave Conversation'},
      {id: 1, player: 'YOUTUBE', src: 'r6bkETisayg', name: 'The last storyline'},
    ]
  }
]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { contentIndex : 0, topicIndex: 0 };

  }

  render() {
    const contentList = topics[this.state.topicIndex].contents;
    return (
      <div>
        <Header topics = {topics} 
                currentIndex = {this.state.topicIndex}
                onChangeTopic = {(index) => {this.setTopic(index)}}
        />

        <div className="row">

          <div className="w3-threequarter w3-container">
            <ContentPlayer  data = {contentList}
                            contentIndex = {this.state.contentIndex}
                            onContentChange = {(contentIndex) => this.setState({contentIndex})}
            />
          </div>

          <div className="w3-quarter w3-container">
            <ContentList data = {contentList} 
            />
          </div>

        </div>
        
      </div>
    )
  }

  setTopic(index) {
    this.setState({ topicIndex : index, contentIndex: 0 })
  }

}

render(<App />, document.getElementById('root'));