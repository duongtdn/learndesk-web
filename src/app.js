"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import style from './css/app.css'
import w3 from './css/w3.css'

import Header from './Header'
import ContentPlayer from './ContentPlayer'
import ContentList from './ContentList'

const progress = [

]

const data = [
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

    this.completeContent = this.completeContent.bind(this)

  }

  render() {
    const topics = this.props.data;
    const contentList = topics[this.state.topicIndex].contents;
    return (
      <div>
        <Header topics = {topics} 
                currentIndex = {this.state.topicIndex}
                onChangeTopic = {(index) => {this.changeTopic(index)}}
        />

        <div className="row">

          <div className="w3-threequarter w3-container">
            <ContentPlayer  data = {contentList}
                            contentIndex = {this.state.contentIndex}
                            onChangedContent = {(contentIndex) => this.changeContent(contentIndex)}
                            onCompletedContent = {this.completeContent}
            />
          </div>

          <div className="w3-quarter w3-container">
            <ContentList  data = {contentList} 
                          onChangedContent = {(contentIndex) => this.changeContent(contentIndex)}
                          progress = {this.props.progress[this.state.topicIndex]}
            />
          </div>

        </div>
        
      </div>
    )
  }

  changeTopic(index) {
    this.setState({ topicIndex : index, contentIndex: 0 })
  }

  changeContent(contentIndex) {
    const topics = this.props.data;
    const contents = topics[this.state.topicIndex].contents;

    if (contentIndex < 0) {
      const topicIndex = this.state.topicIndex - 1;
      if (topicIndex > -1) {
        contentIndex = 0;
        this.setState({ topicIndex, contentIndex });
      }
      return
    }

    if (contentIndex < contents.length) {
      this.setState({contentIndex});
      return
    }
    
    /* last content, move to next topic if any */
    const topicIndex = this.state.topicIndex + 1;
    if (topicIndex < topics.length) {
      contentIndex = 0;
      this.setState({ topicIndex, contentIndex });
      return
    }  
  }

  completeContent(contentIndex) {
    this.props.onCompletedContent && this.props.onCompletedContent({
      topicIndex: this.state.topicIndex,
      contentIndex
    });
    this.changeContent(this.state.contentIndex+1)
  }

}

class AppData extends Component {
  constructor(props) {
    super(props);
    this.state = { data, progress }
    this.updateProgress = this.updateProgress.bind(this);
  }

  render() {
    return (
      <App  data = {this.state.data}
            progress = {this.state.progress}
            onCompletedContent = {this.updateProgress}
      />
    )
  }

  updateProgress({topicIndex, contentIndex}) {
    if (!progress[topicIndex]) {
      progress[topicIndex] = [];
    }
    progress[topicIndex][contentIndex] = true;
    this.setState({ progress })
  }
}

render(<AppData />, document.getElementById('root'));