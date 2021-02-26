import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications'

import AuthContext from './app/auth/context'
import authStorage from './app/auth/storage'
import clientApi from './app/api/clientApi'

import AuthNavigator from './app/navigation/AuthNavigator'
import AppNavigator from './app/navigation/AppNavigator'
import navTheme from './app/navigation/navTheme'

export default function App() {
  const { getUser } = clientApi
  const [user, setUser] = useState()
  const [isReady, setIsReady] = useState(false)

  /*
  const scheduledNotifications = async () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
      })
    })

    const oneDayTrigger = 86400

    // 18:00

    
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Are you watching TV right now?',
        body: 'Let us know!'
      },
      trigger: {
        seconds: oneDayTrigger,
        repeats: true
      }
    })

    // 20:00

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Are you watching TV right now?',
        body: 'Let us know!'
      },
      trigger: {
        seconds: oneDayTrigger
      }
    })
  }

  useEffect(() => {
    scheduledNotifications()
  }, [scheduledNotifications]) */

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
