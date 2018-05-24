import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Signin from './components/Signin/Signin';
import Registration from './components/Registration/Registration';




//particles react plugin config
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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedin: false,
  user: {
    "id": '',
    "name": '',
    "email": '',
    "password": '',
    "entries": 0,
    "joined": ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    if (this.state.input === '') {
      return console.log('error');
    }
    this.setState({ imageUrl: this.state.input });
    fetch('https://mysterious-sands-28972.herokuapp.com/imageurl', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "input": this.state.input
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          fetch('https://mysterious-sands-28972.herokuapp.com/image', {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              "id": this.state.user.id
            })
          }).then(response => response.json())
            .then(data => {
              this.setState(Object.assign(this.state.user, {
                entries: data
              }))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(res))
      })
      .catch(console.log)
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedin: true });
    } else {
      this.setState({ isSignedin: true });
    }
    this.setState({ route: route });
  }

  loadUser = (data) => {
    this.setState({
      user: {
        "id": data.id,
        "name": data.name,
        "email": data.email,
        "password": data.password,
        "entries": data.entries,
        "joined": data.joined
      }
    })
  }

  render() {
    const { isSignedin, box, imageUrl, route } = this.state;
    return (
      <div className="App" >
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedin={isSignedin} onRouteChange={this.onRouteChange} />
        <Logo />
        {
          route === 'home'
            ? <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange}
                onButtonClicked={this.onPictureSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            : (route === 'signin' || route === 'signout'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Registration loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
