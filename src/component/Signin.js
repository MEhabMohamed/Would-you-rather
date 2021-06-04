import React , { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUsers'
import { Link } from 'react-router-dom'
import Wyr from '../Wyr.jpg'
import './signin.css'

class Signin extends Component {
    state = {
        user: null,
        pass: ''
    }

    handlePass = (e) => {
        const evt = e.target.value

        this.setState(() => ({
            pass: evt
        }))
    }

    handleChange = (e) => {
        const value = e.target.value

        this.setState(() => ({
            user: value
        }))
    }

    render () {
        const { user , pass } = this.state
        const { from } = this.props.location.state || { from: { pathname: '/welcome'} }
        return (
            <div className='container'>
                <h3>Welcome to Would you Rather, Have fun!</h3>
                <img className='main' src={Wyr} alt='Would you rather'/>
                <label className='signLabel' >Please select user or Create new one</label>
                <select className='userSelect' defaultValue='sel' onChange={this.handleChange}>
                    <option label='Select User' value='sel' disabled/>
                        {this.props.users.map(user => {
                            return <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                })}
                </select>
                <p>Please Enter your password:
                (default users passwords: Sarah: sarah891, Tyler: tyler523,
                John: john4468) </p>
                <textarea 
                    placeholder='Password'
                    value={pass}
                    className='password'
                    onChange={this.handlePass}
                />
                {(user !== (null && '')) && 
                <Link className='signin' to={from} onClick=
                {() => {
                    if (this.props.passCheck[user].password === pass) { 
                        return this.props.dispatch(setAuthedUser(user))}
                        return alert('Invalid password, Please Try again!')}}>Sign In</Link>}
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users: Object.values(users),
        passCheck: users,
    }
}

export default connect(mapStateToProps)(Signin)