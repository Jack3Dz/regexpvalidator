import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Form.css';class Form extends Component {
    constructor (props) {
        super(props);
        this.state = {
          exp: '',
          formErrors: {exp: ''},
          expValid: false,
          formValid: false
        }
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let expValid = this.state.expValid;
      
        switch(fieldName) {
          case 'exp':
            expValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.exp = expValid ? '' : ' is invalid';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        expValid: expValid
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

    render () {
        return (
            <form className="demoForm">
                <div className={`form-group
                    ${this.errorClass(this.state.formErrors.exp)}`}>

                    <label htmlFor="exp">Expressão a ser validada</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="exp" 
                        value={this.state.exp}
                        onChange={(event) => this.handleUserInput(event)}/>
                        
                </div>
                <Button type="submit" bsSize="large"
                    disabled={!this.state.formValid}>Validar
                </Button>
            </form>
        )
    };
};
export default Form;