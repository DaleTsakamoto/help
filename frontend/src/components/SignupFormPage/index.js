import React, {useState} from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './SignupForm.css';

const SignupFormPage = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [helpType, setHelpType] = useState(true)
  const [errors, setErrors] = useState([])

  if (sessionUser) {
    return <Redirect to="/" />
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return (
        dispatch(sessionActions.signup({ email, username, password, firstName, lastName, helpType }))
      )
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
      <label>First Name
        <input
          value={firstName}
          type='text'
          onChange={ e => setFirstName(e.target.value) }
          required
        />
        </label>
        <label>Last Name
        <input
          value={lastName}
          type='text'
          onChange={ e => setLastName(e.target.value) }
          required
        />
      </label>
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
      <label htmlFor="helpType">Help Type:</label>
      <select id="helpType">
        <option value={true} onChange={e => setHelpType(true)} required>Helper</option>
        <option value={false} onChange={e => setHelpType(false)} required>Helpee</option>
      </select>
      <button type="submit">Sign-up</button>
    </form>
  )
}

export default SignupFormPage;