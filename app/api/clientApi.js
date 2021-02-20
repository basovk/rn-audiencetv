import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const clientApi = axios.create({
  baseURL: 'http://192.168.0.37:5000/api'
})

const key = 'authToken'

const register = async (name, email, password, address, gender, birthdate) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await clientApi.post(
      '/auth/register',
      { name, email, password, address, gender, birthdate },
      config
    )

    return data
  } catch (error) {
    return error.response && error.response.data.error
      ? error.response.data.error
      : error.message
  }
}

const login = async (email, password) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await clientApi.post(
      '/auth/login',
      { email, password },
      config
    )

    return data
  } catch (error) {
    return error.response && error.response.data.error
      ? error.response.data.error
      : error.message
  }
}

const getUser = async (authToken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }

    const { data } = await clientApi.get('/auth/me', config)

    return data
  } catch (error) {
    return error.response && error.response.data.error
      ? error.response.data.error
      : error.message
  }
}

const getProgramsWithShows = async () => {
  try {
    const { data } = await clientApi.get('/programs')

    return data
  } catch (error) {
    return error.response && error.response.data.error
      ? error.response.data.error
      : error.message
  }
}

const userWatchedShow = async (showId, authToken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }

    const { data } = await clientApi.put(`/shows/${showId}`, null, config)

    return data
  } catch (error) {
    return error.response && error.response.data.error
      ? error.response.data.error
      : error.message
  }
}

const logout = async () => {
  await SecureStore.deleteItemAsync(key)
}

export default {
  register,
  login,
  logout,
  getUser,
  getProgramsWithShows,
  userWatchedShow
}
