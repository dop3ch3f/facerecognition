import React, { Component } from 'react';

export default class Navigation extends Component {
    //eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        const { onRouteChange, isSignedin } = this.props;
        if(isSignedin){   
            return (
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <p onClick={() => onRouteChange('signout')}
                  className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                </nav>
            );
        }else{    
           return (
                    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('register')}
                    className='f3 link dim black underline pa3 pointer'>Register</p>
                    </nav>
            );  
        }    
    }
}