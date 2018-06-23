import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog'

class App extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      exp: '',
      lstCondition: '1',
      formErrors: {exp: ''},
      expValid: false,
      formValid: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  validateField(fieldName, value, lstValue) {
    let fieldValidationErrors = this.state.formErrors;
    let expValid = this.state.expValid;
    let exp = this.state.exp;
    var regex;
    regex= /[^0-1]+/g;
    exp = value.replace(regex, '')
  
    switch(lstValue) {
      case '1':
        expValid = exp.match(/\b01\S*10\b/);
        fieldValidationErrors.exp = expValid ? '' : ' is invalid';
        break;

      case '2':
        expValid = exp.match(/\S*[0-1]/);
        fieldValidationErrors.exp = expValid ? '' : ' is invalid';
        break;

      case '3':
        expValid = exp.match(/(\S*101){2,}.*/);
        fieldValidationErrors.exp = expValid ? '' : ' is invalid';
        break;

      case '4':
        expValid = exp.match(/^(0*10*){4}$/);
        fieldValidationErrors.exp = expValid ? '' : ' is invalid';
        break;

      case '5':
        expValid = exp.match(/(?=.*1001)(?=.*0110).*/);
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
    const lstValue = this.state.lstCondition;
    this.setState({[name]: value}, 
                  () => { this.validateField(name, value, lstValue) },
                  () => { this.errorClass(this.state.formErrors.exp) });
  }

  handleUserSelect(e) {
    this.setState({exp: '',
                  lstCondition: e.target.value,
                  formValid: false},
                  () => { this.errorClass(this.state.formErrors.exp) });
  }

  handleUserClick(e) {
    this.dialog.showAlert('Parabéns, essa é uma condição válida!');
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
            <FormGroup controlId="lstCondition">
              <ControlLabel>Expressão a ser validada</ControlLabel>
              <FormControl 
                componentClass="select" placeholder="select" bsSize="large" 
                onChange={(event) => this.handleUserSelect(event)} selected="1">

                <option value="1">Cadeias que começam com 01 e terminam com 10.</option>
                    {/*        \b01\S*10\b              */}
                <option value="2">Cadeias com qualquer cadeia de entrada.</option>
                    {/*        \S*[0-1]                 */}
                <option value="3">Cadeias com pelo menos duas ocorrências do padrão 101</option>
                    {/*       (\S*101){2,}.*            */}
                <option value="4">Todas Cadeias que contenham exatamente quatro 1s.</option>
                    {/*       ^(0*10*){4}$              */}
                    {/*       /^([^1]*1[^1]*){4}$/      */}
                <option value="5">Contenham as cadeias 0110 e 1001.</option>
                    {/*       (?=.*1001)(?=.*0110).*    */}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="exp" bsSize="large" 
              className={`form-group
              ${this.errorClass(this.state.formErrors.exp)}`}>
              <ControlLabel>Cadeia</ControlLabel>
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
              type="submit"
              onClick={(event) => this.handleUserClick(event)}>

              Validar
            </Button>
            <Dialog ref={(el) => { this.dialog = el }} />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
