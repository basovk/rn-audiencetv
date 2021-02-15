import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'

import WelcomeScreen from './app/screens/WelcomeScreen'
import ProgramsScreen from './app/screens/ProgramsScreen'
import AccountScreen from './app/screens/AccountScreen'
import LoginScreen from './app/screens/LoginScreen'
import RegisterScreen from './app/screens/RegisterScreen'

import AuthContext from './app/auth/context'
import authStorage from './app/auth/storage'

import AuthNavigator from './app/navigation/AuthNavigator'
import AppNavigator from './app/navigation/AppNavigator'
import clientApi from './app/api/clientApi'
import navTheme from './app/navigation/navTheme'

export default function App() {
  const { getUser } = clientApi

  const [user, setUser] = useState()
  const [isReady, setIsReady] = useState(false)

  const restoreUser = async () => {
    const token = await authStorage.getToken()
    const user = await getUser(token)
    console.log('In App.js: ', user.data)
    if (user) return setUser(user.data)
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({})