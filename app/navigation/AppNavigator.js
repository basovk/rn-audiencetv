import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import ProgramsScreen from '../screens/ProgramsScreen'
import AccountScreen from '../screens/AccountScreen'

const Tab = createBottomTabNavigator()

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name='Programs'
      component={ProgramsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='remote-tv' color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name='Account'
      component={AccountScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='account' color={color} size={size} />
        )
      }}
    />
  </Tab.Navigator>
)

export default AppNavigator
