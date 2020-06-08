import React, { useEffect, useState, useCallback } from 'react'
import {
  GlobalStyle,
  AppWrapper,
  AppHeader,
  UserWrapper,
  User,
  UserSpan
} from './App.styled'

const App = () => {
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState(-1)
  const [user, setUser] = useState({})
  const [sentence, setSentence] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/users/')
      .then((response) => {
        if (response.status !== 200) {
          // check for all error messages
          throw new Error(`${response.status}: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => setUsers(data))
      .catch((err) => {
        setError(err.toString()) // Convert Error object to string
      })
  }, [])

  useEffect(() => {}, [])

  const showUserInfo = useCallback((id) => {
    fetch(`http://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          // check for all error messages
          throw new Error(`${response.status}: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => {
        setUserId(data.id)
        setUser(data)
      })
      .catch((err) => {
        setError(err.toString()) // Convert Error object to string
      })
  }, [])

  return (
    <AppWrapper>
      <GlobalStyle />
      <AppHeader>
        <h1>Listing users</h1>
        {!error && users.length === 0 && <div>Loading...</div>}
        {!error && users.length > 0 && (
          <UserWrapper>
            {users.map((user) => (
              <User key={user.id} onClick={() => showUserInfo(user.id)}>
                {user.name}
                {userId === user.id && (
                  <UserSpan>Emaill: {user.email}</UserSpan>
                )}
              </User>
            ))}
          </UserWrapper>
        )}
        {error && (
          <div>
            <div>Error loading data</div>
            <div>{error}</div>
          </div>
        )}
      </AppHeader>
    </AppWrapper>
  )
}

export default App
