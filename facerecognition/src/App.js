import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Signin from './components/Signin/Signin';
import Registration from './components/Registration/Registration'; 


//clarifai api config
const app = new Clarifai.App({
  apiKey: 'fe39004f071c45d59db743cd74c24c94'
});

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedin: false
    }
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
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(res => this.displayFaceBox(this.calculateFaceLocation(res)))
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === "signout") {
      this.setState({ isSignedin: false });
    }else if(route === "home"){
      this.setState({ isSignedin: true });
    }else{
      this.setState({ isSignedin: true });
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedin,box,imageUrl,route} = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedin={isSignedin} onRouteChange={this.onRouteChange}/>
        <Logo />
        {
          route === 'home' 
          ?  <div> 
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange}
                onButtonClicked={this.onSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div> 
          :  (route === 'signin' || route === 'signout'
                ? <Signin onRouteChange={this.onRouteChange} /> 
                : <Registration onRouteChange={this.onRouteChange} />
              )
            
        }
      </div>
    );
  }
}

export default App;
