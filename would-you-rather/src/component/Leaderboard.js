import React , { Component } from 'react'
import { connect } from 'react-redux'
import './leaderboard.css'

class Leaderboard extends Component {
    render() {
        return (
            <div className='lbContainer'>
                 <ul>
                     {this.props.user.map((u) => {
                         const sortedUser = this.props.users[u]
                         const len = Object.keys(sortedUser.answers).length
                         const score = len + sortedUser.questions.length
                         return (
                             <li key={sortedUser.id}>
                                <img className='lbAvatar' src={sortedUser.avatarURL} alt={sortedUser.id}/>
                                <h2>{sortedUser.name}</h2>
                                <p>Answered Questions: {len}</p>
                                <p>Created Questions: {sortedUser.questions.length}</p>
                                <h3>Score:</h3>
                                <p className='top'>{score}</p>
                            </li>
                         )
                     })}
                 </ul>
            </div>
        )
    } 
}

function mapStateToProps ({ users }) {
    console.log(users)
    return {
        user: Object.keys(users)
            .sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length)
            -(users[a].questions.length + Object.keys(users[a].answers).length)),
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)