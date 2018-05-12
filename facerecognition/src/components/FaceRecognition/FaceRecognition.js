import React, { Component } from 'react';


export default class FaceRecognition extends Component {
    //eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        const { imageUrl } = this.props;
        return (
            <div className='center ma'>
                <div className='absolute mt2 '>
                    <img src={imageUrl} alt='Result'
                        width='500px' height='auto' />
                </div>
            </div>
        )
    }
}