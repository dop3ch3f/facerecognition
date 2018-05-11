import React, { Component } from 'react';

export default class Rank extends Component {
    //eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='white f3'>{'Andrei, your current rank is..'}</div>
                <div className='white f1'>{'#5'}</div>
            </div>
        )
    }
}