import React from 'react'
import { connect , useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './answeredQ.css'

const HomeAnsweredQuestion = ({id}) => {
       const { questions , users } = useSelector((state) => state)
       const question = questions[id]
       const user = users[question.author]

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

export default connect()(HomeAnsweredQuestion)