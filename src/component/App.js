import React, { Component , Fragment } from 'react'
import { connect , useSelector } from 'react-redux'
import { BrowserRouter as Router , Route, Switch , Redirect } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Signin from './Signin'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
import Home from './Home'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import Question from './Question'
import CreateUser from './CreateUser'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authedUser = useSelector((state) => state.authedUser)
  return (
  <Route {...rest} render={(props) => (
    authedUser !== null
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
  )} />)
}

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
            <Switch>
              <Route path='/' exact component={Signin} />
              {this.props.signin ? <Route path='/newuser' component={CreateUser} />
              : <Route path='/newuser'>Please Signout to use</Route>}
              <PrivateRoute path='/leaderboard' component={Leaderboard} />
              <PrivateRoute path='/add' component={NewQuestion} />
              <PrivateRoute path='/welcome' component={Home} />
              <PrivateRoute path='/question/:id' component={Question} />
              <Route path="*">Error 404: Not Found</Route>
            </Switch>
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