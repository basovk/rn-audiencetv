import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

import Screen from '../components/Screen'
import AppText from '../components/AppText'
import ListItem from '../components/ListItem'
import Icon from '../components/Icon'
import colors from '../config/colors'

import useAuth from '../auth/useAuth'

export default function AccountScreen() {
  const { user, logOut } = useAuth()

  return (
    <Screen style={styles.screen}>
      <View style={styles.accountContainer}>
        <View style={styles.avatar}>
          {user.gender === 'Male' ? (
            <Image
              source={require(`../assets/avatar-male.jpg`)}
              style={styles.image}
            />
          ) : (
            <Image
              source={require(`../assets/avatar-female.jpg`)}
              style={styles.image}
            />
          )}
        </View>
        <AppText style={styles.name}>{user.name}</AppText>
        <AppText style={styles.email}>{user.email}</AppText>
      </View>
      <View style={styles.container}>
        <ListItem
          title='Last Seen'
          subTitle="See what you've been watching"
          IconComponent={
            <Icon
              name='remote-tv'
              backgroundColor={colors.cardLightColor}
              iconColor={colors.darker}
            />
          }
        />
      </View>
      <View style={styles.logout}>
        <ListItem
          title='Log Out'
          IconComponent={
            <Icon
              name='logout'
              backgroundColor={colors.cardLightColor}
              iconColor={colors.darker}
            />
          }
          onPress={() => logOut()}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 15,
    backgroundColor: colors.white
  },
  accountContainer: {
    top: 40,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  name: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text
  },
  email: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textLight
  },
  container: {
    marginVertical: 50
  },
  logout: {
    marginVertical: 30
  }
})
