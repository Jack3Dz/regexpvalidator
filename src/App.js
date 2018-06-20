import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exp: ""
    };
  }

  validateForm() {
    return this.state.exp.length > 0;
    
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });

    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
       this.setState({value: event.target.value})
    }
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Exp">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="exp" bsSize="large">
            <ControlLabel>Expressão a ser validada:</ControlLabel>
            <FormControl
              autoFocus
              type="exp"
              value={this.state.exp}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Validar
          </Button>
        </form>
      </div>
    );
  }
}

export default App;
