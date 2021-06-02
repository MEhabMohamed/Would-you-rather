import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './homeQuestion.css'

class HomeQuestion extends Component {
   render() {
       const { question , user , id } = this.props

       const { optionOne, author } = question
       const { name , avatarURL } = user

       return (
           <div className='homeQuesContainer'>
                <img className='homeAvatar' src={avatarURL} alt={author}/>
                <h3 className='homeAsking'>{name} is Asking: Would you rather</h3>
                <p className='preview'>--{optionOne.text}--</p>
                <Link to={`question/${id}`} className='viewFull'>
                    View Full
                </Link>
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
        authedUser,
        id
    }
}

export default connect(mapStateToProps)(HomeQuestion)