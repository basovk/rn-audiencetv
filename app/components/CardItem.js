import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native'

import AppText from './AppText'
import colors from '../config/colors'

export default function CardItem({
  name,
  id,
  title,
  subTitle,
  imageUrl,
  onPress
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image style={styles.image} source={imageUrl} />
          <AppText style={styles.name}>{name}</AppText>
        </View>

        <View style={styles.showContainer}>
          <AppText style={styles.title} numberOfLines={2}>
            {title}
          </AppText>
          <AppText style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardLightColor,
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,

    elevation: 5
  },
  logoContainer: {
    flexDirection: 'row',
    padding: 15
  },
  image: {
    width: '30%',
    height: 90,
    resizeMode: 'contain'
  },
  name: {
    fontSize: 24,
    color: colors.textLight,
    marginLeft: 25
  },
  showContainer: {
    padding: 20
  },
  title: {
    marginBottom: 8,
    color: colors.primary,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 14,
    color: colors.textLight
  }
})
