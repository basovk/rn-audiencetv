import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'

import AppButton from '../components/AppButton'

import routes from '../navigation/routes'

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={2}
      style={styles.backgroundImage}
      source={require('../assets/tv1.jpg')}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/tv-logo.png')} />
        <Text style={styles.text}>Tell Us What You're Watching</Text>
      </View>
      <View style={styles.logAndRegContainer}>
        <AppButton
          title='Login'
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title='Register'
          color='secondary'
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  logoContainer: {
    position: 'absolute',
    top: 80,
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  text: {
    fontSize: 23,
    fontWeight: '600',
    paddingVertical: 20
  },
  logAndRegContainer: {
    width: '100%',
    padding: 25
  }
})
