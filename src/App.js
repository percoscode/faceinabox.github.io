import React from 'react';
import Particles from 'react-particles-js'; 
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from  './components/Navigation/Navigation';
import Logo from  './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: '918db7f6e6c4422da1628623fb0d8ef4'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    // console.log('hdlrlrlr');
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        //model id, image
        "a403429f2ddf4b49b307e318f00e528b", this.state.input)
      .then(
        function(response) {
          console.log(response);
        },
        function(err) {
          console.log(err)
        }
      );
  }

  render() {  
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
