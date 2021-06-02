import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './answeredQ.css'

class HomeAnsweredQuestion extends Component {
   render() {
       const { question , user , id } = this.props

       const { optionOne , author } = question
       const { name , avatarURL } = user

       return (
           <div className='ansContainer'>
                <img className='avatar' src={avatarURL} alt={author}/>
                <h3 className='askedBy'>Asked by {name}</h3>
                <h3 className='results'>Results:</h3>
                <div className='optionOne'>
                    <p className='head'>Would you rather: <br /> --{optionOne.text}?--</p>
                    <Link to={`question/${id}`} className='viewFull'>
                        View Full
                    </Link>
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

export default connect(mapStateToProps)(HomeAnsweredQuestion)