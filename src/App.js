import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap'

class App extends Component {
  
  handleClick = () => {
    console.log('teste');
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
          <div class="App-center">
            <Button type="button" class="btn btn-primary">Validar</Button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
