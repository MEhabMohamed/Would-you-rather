import React , { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUsers'
import { Link } from 'react-router-dom'
import Wyr from '../Wyr.jpg'
import './signin.css'

class Signin extends Component {
    state = {
        user: null
    }

    handleChange = (e) => {
        const value = e.target.value

        this.setState(() => ({
            user: value
        }))
    }

    render () {
        const { user } = this.state
        return (
            <div className='container'>
                <h3>Welcome to Would you Rather, Have fun!</h3>
                <img className='main' src={Wyr} alt='Would you rather'/>
                <label className='signLabel' >Please select user then press Sign In</label>
                <select className='userSelect' onChange={this.handleChange}>
                    <option label='Select User' selected disabled/>
                        {this.props.users.map(user => {
                            return <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                })}
                </select>
                {(user !== (null && '')) && 
                <Link className='signin' to='/welcome' onClick=
                {() => this.props.dispatch(setAuthedUser(user))}>Sign In</Link>}
            </div>
        )
    }
}

function mapStateToProps ({ users , authedUser }) {
    return {
        users: Object.values(users),
        authedUser
    }
}

export default connect(mapStateToProps)(Signin)