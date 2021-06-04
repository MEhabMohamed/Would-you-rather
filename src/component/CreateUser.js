import React , { Component } from 'react'
import { connect } from 'react-redux'
import sarah from '../utils/sarah.jpg'
import tyler from '../utils/tyler.jpg'
import john from '../utils/john.png'
import './createUser.css'
import { handleAddUser } from '../actions/users'
import { Redirect } from 'react-router'

class CreateUser extends Component {
    state = {
        name: '',
        avatar: '',
        password: '',
        toLogin: false
    }

    handleChangeTxt = (e) => {
        const evt = e.target.value

        this.setState(() => ({
            name: evt
        }))
    }

    handleChangeAvatar = (e) => {
        const evt = e.target.value

        this.setState(() => ({
            avatar: evt
        }))
    }

    handleChangepass = (e) => {
        const evt = e.target.value

        this.setState(() => ({
            password: evt
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { name , avatar , password } = this.state
        const { dispatch } = this.props
        const id = name.replace(/\s+/g, '').trim().toLowerCase()

        if (name  && avatar && password !== '') {
        dispatch(handleAddUser({ id , name , avatar , password }))

        this.setState(() => ({
            name: '',
            avatar: '',
            password: '',
            toLogin: true
        }))
      } else {alert('Please enter a valid name , avatar , password!')}
    }

    render() {
        const { name , toLogin , password } = this.state
        if ( toLogin === true ) {
            return <Redirect to='/' />
        }
        return (
            <div className='newuser'>
                <h3>Create User</h3>
                <form className='createForm' onSubmit={this.handleSubmit}>
                    <p>Name:</p>
                    <textarea 
                        placeholder='Enter user name'
                        value={name}
                        onChange={this.handleChangeTxt}
                        className='txt'
                    />
                    <p>Password:</p>
                    <textarea 
                        placeholder='Enter password'
                        value={password}
                        onChange={this.handleChangepass}
                        className='txt'
                    />
                    <ul>
                        <li>
                            <input type='radio' name='avatar' value={sarah} onChange={this.handleChangeAvatar}/>
                                <label>Girl Avatar</label>
                            <img src={sarah} alt='girl' className='newAvatar'/>
                        </li>
                        <li>
                            <input type='radio' name='avatar' value={tyler} onChange={this.handleChangeAvatar}/>
                                <label>First Boy Avatar</label>
                            <img src={tyler} alt='boyOne' className='newAvatar'/>
                        </li>
                        <li>
                            <input type='radio' name='avatar' value={john} onChange={this.handleChangeAvatar}/>
                                <label>Second Boy Avatar</label>
                            <img src={john} alt='boyTwo' className='newAvatar'/>
                        </li>
                    </ul>
                    <button type='submit' className='create'>Create</button>
                </form>
            </div>
        )
    }
}

export default connect()(CreateUser)