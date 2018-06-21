import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exp: '',
      formErrors: {exp: ''},
      expValid: false,
      formValid: false
    };
  }

  // validateForm() {
  //   return this.state.exp.length > 0;
    
  // }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });

  //   const re = /^[0-9\b]+$/;
  //   if (event.target.value === '' || re.test(event.target.value)) {
  //      this.setState({value: event.target.value})
  //   }
  // }

  handleSubmit = event => {
    event.preventDefault();
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let expValid = this.state.expValid;
    let exp = this.state.exp;
    var regex;
    regex= /[^0-1]+/g;
    exp = value.replace(regex, '')
  
    switch(fieldName) {
      case 'exp':
        expValid = exp.match(/^[0-1\b]+$/);
        fieldValidationErrors.exp = expValid ? '' : ' is invalid';
        break;

      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    expValid: expValid,
                    exp: exp
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.expValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
                  () => { this.validateField(name, value) });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Validador de Regex</h2>
          <br />
        </div>

        <div className="Exp">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="exp" bsSize="large">
              <ControlLabel>Expressão a ser validada</ControlLabel>
              <FormControl
                id="exp"
                name="exp"
                type="num"
                autoFocus
                value={this.state.exp}
                onChange={(event) => this.handleUserInput(event)}
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.state.formValid}
              type="submit">

              Validar
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
