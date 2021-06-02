import React , { Component } from 'react'
import { connect } from 'react-redux'
import './home.css'
import HomeAnsweredQuestion from './HomeAnsweredQuestion'
import HomeQuestion from './HomeQuestion'

class Home extends Component {
    state = {
        answered: false,
        unanswered: true
    }

    showAnswered = (e) => {
        e.preventDefault()

        this.setState(() => ({
            answered: true,
            unanswered: false
        }))
    }

    showUnanswered = (e) => {
        e.preventDefault()

        this.setState(() => ({
            answered: false,
            unanswered: true
        }))
    }

    render () {
        return (
            <div className='homeContainer'>
                <button className='ans' onClick={this.showAnswered}>Answered Question</button>
                <button className='ans' onClick={this.showUnanswered}>Unanswered Question</button>
                <ul className='homeItems'>
                    {this.props.questionsID.map(id => {
                        let checkOne = this.props.questions[id].optionOne.votes.includes(this.props.authedUser)
                        let checkTwo = this.props.questions[id].optionTwo.votes.includes(this.props.authedUser)
                        return <li key={id}>
                                {(this.state.unanswered && (!checkOne && !checkTwo)) && <HomeQuestion id={id} />}
                                {(this.state.answered && (checkOne || checkTwo)) && <HomeAnsweredQuestion id={id} />}
                            </li>
                        })}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ questions , authedUser }) {
    return {
      questionsID: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp-questions[a].timestamp),
      authedUser,
      questions
    }
  }

export default connect(mapStateToProps)(Home)