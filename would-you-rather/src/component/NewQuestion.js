import React , { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import './question.css'

class NewQuestion extends Component {
    state = {
        textOne: '',
        textTwo: '',
        toHome: false
    }

    handleOptionOne = (e) => {
        const evt = e.target.value

        this.setState(() => ({
            textOne: evt
        }))
    }

    handleOptionTwo = (e) => {
        const evt = e.target.value

        this.setState(() => ({
            textTwo: evt
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { textOne, textTwo } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(textOne , textTwo))

        this.setState(() => ({
            textOne: '',
            textTwo: '',
            toHome: true
        }))
    }

    render() {
        const { textOne, textTwo } = this.state

        if (this.state.toHome === true) {
            return <Redirect to='/welcome' />
        }

        return (
            <div className='homeContainer'>
                <h1>Create New Question</h1>
                <p>Complete the question</p>
                <h3>Would you rather:</h3>
                <form className='newQues' onSubmit={this.handleSubmit}>
                    <textarea 
                    placeholder='Enter option one text here'
                    value={textOne}
                    onChange={this.handleOptionOne}
                    className='textarea'
                    />
                    <span>OR</span>
                    <textarea 
                    placeholder='Enter option two text here'
                    value={textTwo}
                    onChange={this.handleOptionTwo}
                    className='textarea'
                    />
                    <button type='submit' 
                    disabled={(textOne && textTwo) === ''}
                    className='ansBtn'>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)