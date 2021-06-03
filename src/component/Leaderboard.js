import React  from 'react'
import { connect , useSelector } from 'react-redux'
import './leaderboard.css'

const Leaderboard = () => {
        const users = useSelector((state) => state.users)
        const user = Object.keys(users)
        .sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length)
        -(users[a].questions.length + Object.keys(users[a].answers).length))
        return (
            <div className='lbContainer'>
                 <ul>
                     {user.map((u) => {
                         const sortedUser = users[u]
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

export default connect()(Leaderboard)