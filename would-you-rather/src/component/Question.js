import React , { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import AnsweredQuestion from './AnsweredQuestion'
import './question.css'

class Question extends Component {
    state = {
        value: '',
    }

    handleChange = (e) => {
        const evt = e.target.value

        this.setState(() => ({
            value: evt
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { value } = this.state

        const { dispatch , authedUser , id } = this.props

        dispatch(handleAnswerQuestion({ authedUser , id , value }))
    }

   render() {
       const { question , user , id , authedUser } = this.props

       const { optionOne , optionTwo , author } = question
       const { name , avatarURL } = user

       const checkOne = optionOne.votes.includes(authedUser)
       const checkTwo = optionTwo.votes.includes(authedUser)
       console.log(checkOne, checkTwo)

       return (
           (!checkOne && !checkTwo) ?
           <div className='quesContainer'>
                <img className='quesAvatar' src={avatarURL} alt={author}/>
                <h3 className='askedBy'>{name} is Asking: Would you rather</h3>
                <form className='quesForm' onSubmit={this.handleSubmit}>
                    <input className='optionOne' type='radio' name='question' value='optionOne' onChange={this.handleChange}/>
                        <label htmlFor='optionOne'>{optionOne.text}</label>
                    <input className='optionTwo' type='radio' name='question' value='optionTwo' onChange={this.handleChange}/>
                        <label htmlFor='optionTwo'>{optionTwo.text}</label>
                    <button className='ansBtn' type='submit'>Submit</button>
                </form>
           </div> : <AnsweredQuestion id={id} />
       )
   } 
}

function mapStateToProps ({ questions , users , authedUser } , props) {
    const { id } = props.match.params
    const question = questions[id]
    const user = users[question.author]

    return {
        question,
        user,
        authedUser,
        id
    }
}

export default connect(mapStateToProps)(Question)