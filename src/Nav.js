import React, { Component } from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark primary-color">

            <a class="navbar-brand">Color Token</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
            aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="basicExampleNav">

            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <a className="nav-link">
                <small>
                {this.props.account}
            <span className="sr-only">(current)</span>
            </small>
            </a>
            </li>
            </ul>

            </div>
            </nav>  
        );
    }
}