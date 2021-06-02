import React , { Component } from 'react'
import { connect } from 'react-redux'
import './answeredQ.css'

class AnsweredQuestion extends Component {
   render() {
       const { question , user , authedUser } = this.props

       const { optionOne , optionTwo , author } = question
       const { name , avatarURL } = user
       const total = optionOne.votes.length + optionTwo.votes.length
       const opOnePercent = optionOne.votes.length/(total) * 100
       const opTwoPercent = optionTwo.votes.length/(total) * 100

       return (
           <div className='ansContainer'>
                <img className='avatar' src={avatarURL} alt={author}/>
                <h3 className='askedBy'>Asked by {name}</h3>
                <h3 className='results'>Results:</h3>
                <div className='optionOne'>
                    <p className='head'>Would you rather {optionOne.text}?</p>
                    <p >{isNaN(opOnePercent) ? 0 : opOnePercent} %</p>
                    <p >{optionOne.votes.length} out of {total} votes</p>
                    <p className='vote'>{optionOne.votes.includes(authedUser) && 'Your Vote'}</p>
                </div>
                <div className='optionTwo'>
                    <p className='head'>Would you rather {optionTwo.text}?</p>
                    <p >{isNaN(opTwoPercent) ? 0 : opTwoPercent} %</p>
                    <p >{optionTwo.votes.length} out of {total} votes</p>
                    <p className='vote'>{optionTwo.votes.includes(authedUser) && 'Your Vote'}</p>
                </div>
           </div>
       )
   } 
}

function mapStateToProps ({ questions , users , authedUser } , { id }) {
    const question = questions[id]
    const user = users[question.author]

    return {
        question,
        user,
        authedUser
    }
}

export default connect(mapStateToProps)(AnsweredQuestion)