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
  const [usersError, setUsersError] = useState(false)
  const [userError, setUserError] = useState(false)

  useEffect(() => {
    const p1 = new Promise((resolve, reject) => {
      return setTimeout(resolve, 6000, 'Hello')
    })

    const p2 = 10
    const p3 = Promise.resolve('Done')

    Promise.all([p1, p2, p3]).then((values) => console.warn(values))
    // the order is still p1, then p2, then p3. p2 waits until p1 is finished
  }, [])
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
        setUsersError(err.toString()) // Convert Error object to string
      })
  }, [])

  /**
   * useCallback with async await fetch
   * to get clicked user user
   */
  const showUserInfo = useCallback(async (id: number) => {
    try {
      setUserId(id)
      const response = await fetch(
        `http://jsonplaceholder.typicode.com/users/${id}`
      )
      if (response.status !== 200) {
        throw new Error('byeee')
      }
      const data = await response.json()
      setUser(data)
      setUserError(false)
    } catch (err) {
      setUserError(err.toString()) // Convert Error object to string
    }
  }, [])

  return (
    <AppWrapper>
      <GlobalStyle />
      <AppHeader>
        <h1>Listing users</h1>
        {!usersError && users.length === 0 && <div>Loading...</div>}
        {!usersError && users.length > 0 && (
          <UserWrapper>
            {users.map((user) => (
              <User key={user.id} onClick={() => showUserInfo(user.id)}>
                {user.name}
                {userError && userId === user.id && (
                  <UserSpan>{userError}</UserSpan>
                )}
                {!userError && userId === user.id && !!user.email && (
                  <UserSpan>{user.email}</UserSpan>
                )}
              </User>
            ))}
          </UserWrapper>
        )}
        {usersError && (
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
