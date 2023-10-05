import React, {Component, useState} from "react";
import './Calculator.css';

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}


export default class Calculator extends Component{

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.digito_num = this.digito_num.bind(this)
        this.digito_oper = this.digito_oper.bind(this)

    }

    state = {...initialState}

    

    clearMemory(){
        this.setState({...initialState})
    }

    digito_num(e){
        if(e === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue

        const displayValue = currentValue + e

        this.setState({displayValue, clearDisplay: false})

        if(e !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }

    digito_oper(operation){
        if(this.state.current === 0){
            this.setState({ operation, current: 1, clearDisplay: true})
        } else{
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            switch(currentOperation){
                case '+':
                    values[0] = values[0] + values[1]
                    break
                case '-':
                    values[0] = values[0] - values[1]
                    break
                case '/':
                    values[0] = values[0] / values[1]
                    break
                case '*':
                    values[0] = values[0] * values[1]
                    break
                default:
                    break
            }
            
            this.setState({
                displayValue: values[0],
                operation: equals? null : operation,
                current: equals ? 0 : 1,
                clearDisplay:   !equals, 
                values
            })
        }
    }

    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label='AC' click={this.clearMemory} triple/>
                <Button label='/' click={this.digito_oper} operation/>
                <Button label='7' click={this.digito_num}/>
                <Button label='8' click={this.digito_num}/>
                <Button label='9' click={this.digito_num}/>
                <Button label='*' click={this.digito_oper} operation/>
                <Button label='4' click={this.digito_num}/>
                <Button label='5' click={this.digito_num}/>
                <Button label='6' click={this.digito_num}/>
                <Button label='-' click={this.digito_oper} operation/>
                <Button label='1' click={this.digito_num}/>
                <Button label='2' click={this.digito_num}/>
                <Button label='3' click={this.digito_num}/>
                <Button label='+' click={this.digito_oper} operation/>
                <Button label='0' click={this.digito_num} double/>
                <Button label='.' click={this.digito_num}/>
                <Button label='=' click={this.digito_oper} operation/>
            </div>
        )
    }


}