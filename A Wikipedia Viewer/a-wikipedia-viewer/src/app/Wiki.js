import React, { Component } from 'react';
import './Wiki.css';
import logo from '../img/enwiki.png';
import axios from 'axios';
import Wikiresult from './parts/Wikiresult';

class Wiki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      pages: null
    };
    this.getDate = this.getDate.bind(this);
    this.getInput = this.getInput.bind(this);
  }
  getInput(e) {
    const input = e.target.value;
    this.setState({
      input: input
    });
  }
  getDate() {
    const value = this.state.input;
    if (!value) return false;
    const api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=' + value;
    // var _that = this;
    axios.get(api).then(function (res) {
      this.setState({
        pages: res.data.query.pages
      });
    }.bind(this)).catch(function (err) {
      console.log(err);
    })
  }
  render() {  
    return (
      <div className="wiki">
        <header className="wiki-header">
          <img src={logo} className="wiki-logo" alt="logo" />
        </header>
        <p className="wiki-input">
          <input type="text" onChange={this.getInput} id="wiki-input-text"/>
          <input id="wiki-search" type="button" value="搜索" onClick={this.getDate}/>
          <a href="http://en.wikipedia.org/wiki/Special:Random" target="_blank"><button id="wiki-input-random">手气不错</button></a>
        </p>
        <Wikiresult pages={this.state.pages}/>
      </div>
    );
  }
}

export default Wiki;
