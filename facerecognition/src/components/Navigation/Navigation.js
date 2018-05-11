import React, { Component } from 'react';

export default class Navigation extends Component {
    //eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>);
    }
}