import React, { Component } from 'react';
import './ImageLinkForm.css';

export default class ImageLinkForm extends Component {
    //eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p className='f4 white'>{'This magic brain will detect faces in your picture links'}</p>
                <div className='center'>
                    <div className='form center pa4 br3 shadow-5'>
                        <input className='f4 pa2 w-70 center' type='text' />
                        <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' type='button'>Detect</button>
                    </div>
                </div>
            </div>);
    }
}