import React, { Component , Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Signin from './Signin'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
import Home from './Home'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import Question from './Question'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="mainContainer">
            <Nav />
            {this.props.signin ? 
            <Switch>
              <Route path='/' exact component={Signin} />
              <Route path="*">Please Signin to continue</Route>
            </Switch> :
            <Switch>
              <Route path='/' exact component={Signin} />
              <Route path='/leaderboard' component={Leaderboard} />
              <Route path='/add' component={NewQuestion} />
              <Route path='/welcome' component={Home} />
              <Route path='/question/:id' component={Question} />
              <Route path="*">Error 404: Not Found</Route>
            </Switch>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    signin: authedUser === null
  }
}

export default connect(mapStateToProps)(App);