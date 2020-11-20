import React, {useState} from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './SignupForm.css';

const SignupFormPage = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  if (sessionUser) {
    return <Redirect to="/" />
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>Email
        <input
          value={email}
          type='email'
          onChange={ e => setEmail(e.target.value) }
          required
        />
      </label>
      <label>Username
        <input
          value={username}
          type='text'
          onChange={ e => setUsername(e.target.value) }
          required
        />
      </label>
      <label>Password
        <input
          value={password}
          type='password'
          onChange={ e => setPassword(e.target.value) }
          required
          />
      </label>
      <label>ConfirmPassword
        <input
          value={confirmPassword}
          type='password'
          onChange={ e => setConfirmPassword(e.target.value) }
          required
          />
      </label>
      <button type="submit">Sign-up</button>
    </form>
  )
}

export default SignupFormPage;