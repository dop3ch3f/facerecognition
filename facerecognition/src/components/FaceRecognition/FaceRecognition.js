import React, { Component } from 'react';
import './FaceRecognition.css';

export default class FaceRecognition extends Component {
    //eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        const { imageUrl, box } = this.props;
        return (
            <div className='center ma'>
                <div className='absolute mt2 '>
                    <img id='inputimage' src={imageUrl} alt='Result'
                        width='500px' height='auto' />
                    <div className='bounding-box'
                        style={{
                            top: box.topRow,
                            right: box.rightCol,
                            left: box.leftCol,
                            bottom: box.bottomRow
                        }}
                    ></div>
                </div>
            </div>
        )
    }
}