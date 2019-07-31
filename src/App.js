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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('hdlrlrlr');
    app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict();
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']
      })
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
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
