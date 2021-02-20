import { useContext } from 'react'

import clientApi from '../api/clientApi'

import AuthContext from './context'
import authStorage from './storage'

export default useAuth = () => {
  const { getUser } = clientApi
  const { user, setUser } = useContext(AuthContext)

  const login = async (authToken) => {
    const user = await getUser(authToken)
    console.log('User: ', user.data)
    setUser(user.data)
    authStorage.storeToken(authToken)
  }

  const logOut = () => {
    setUser(null)
    authStorage.removeToken()
  }

  return { user, login, logOut }
}
