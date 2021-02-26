import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'
import { Platform } from 'react-native'

import clientApi from '../api/clientApi'
import authStorage from '../auth/storage'

export default useNotifications = () => {
  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [])

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const {
        status: existingStatus
      } = await Notifications.getPermissionsAsync()

      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data
      console.log(token)
      // store the token to the database
      const authToken = await authStorage.getToken()

      // store expo push token for this user and sign up for notifications
      await clientApi.storeExpoPushToken(token, authToken)

      // send the notification or from server
    } else {
      alert('You need to use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }
  }
}
