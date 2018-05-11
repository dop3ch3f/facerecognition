import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
class App extends Component {

  render() {
    const particlesOptions = {
      particles: {
        line_linked: {
          shadow: {
            enable: true,
            color: "#3CA9D1",
            blur: 5
          }
        }
      }
    }
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
      </div>
    );
  }
}

export default App;
