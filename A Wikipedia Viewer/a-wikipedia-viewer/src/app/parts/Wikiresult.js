import React, { Component } from 'react';
import './Wikiresult.css';

class Wikiresult extends Component {
    getList () {
        if (!this.props.pages) return false;
        const pages = this.props.pages;
        const keys = Object.keys(pages);
        return keys.map(function (value, index) {
            return (
                <li key={index}>
                    <h1>
                        <a href={'https://en.wikipedia.org/?curid=' + pages[value]['pageid']}>
                        {pages[value]['title']}
                        </a>
                    </h1>
                    <p>{pages[value]["extract"]}</p>
                </li>
            )
        })
    }
    render () {
        return (
            <ul id="wiki-output">
                {this.getList()}
            </ul>
        )
    }
}

export default Wikiresult;