import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/colors'

export default function AppTextInput({ icon, width = '100%', ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={22}
          color={colors.light}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.textLight}
        style={styles.text}
        {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.divider,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 12
  },
  icon: {
    marginRight: 10
  },
  text: {
    color: colors.textLight,
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'San Francisco'
  }
})
