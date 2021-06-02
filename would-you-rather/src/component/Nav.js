import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'
import { useSelector , useDispatch } from 'react-redux'
import { signOut } from '../actions/authedUsers'

export default function Nav () {
    const name = useSelector((state) => state.users)
    const authedUser = useSelector((state) => state.authedUser)
    const dispatch = useDispatch()
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/welcome' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        {authedUser ?
        <ul>
          <li className='title'>
              Welcome  {name[authedUser].name} 
          </li>
          <li>
            <NavLink to='/' exact activeClassName='active' onClick={() => dispatch(signOut())}>
              Sign Out
            </NavLink>
          </li>
        </ul> : null}
      </ul>
    </nav>
  )
}