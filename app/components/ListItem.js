import React from 'react'
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'

import colors from '../config/colors'
import AppText from './AppText'

export default function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress
}) {
  return (
    <TouchableHighlight underlayColor={colors.cardLightColor} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.showContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          {subTitle && (
            <AppText style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </AppText>
          )}
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
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
  showContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text
  },
  subTitle: {
    fontSize: 16,
    color: colors.textLight
  }
})
