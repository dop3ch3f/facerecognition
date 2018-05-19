import React, { Component } from 'react';

export default class Rank extends Component {
    //eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='white f3'>{`${this.props.name}, your current entry count is..`}</div>
                <div className='white f1'>{`${this.props.entries}`}</div>
            </div>
        )
    }
}