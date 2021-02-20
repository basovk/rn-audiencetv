import React, { useState } from 'react'
import { StyleSheet, Image } from 'react-native'
import * as Yup from 'yup'

import Screen from '../components/Screen'
import ErrorForm from '../components/forms/ErrorForm'
import AppForm from '../components/forms/AppForm'
import AppFormEntry from '../components/forms/AppFormEntry'
import SubmitFormButton from '../components/forms/SubmitFormButton'
import colors from '../config/colors'

import clientApi from '../api/clientApi'
import useAuth from '../auth/useAuth'

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password')
})

export default function LoginScreen() {
  const { login } = useAuth()
  const [loginFailed, setLoginFailed] = useState(false)

  const handleSubmit = async ({ email, password }) => {
    const result = await clientApi.login(email, password)

    if (!result.success) {
      return setLoginFailed(true)
    }

    setLoginFailed(false)

    login(result.token)
  }

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/tv-logo.png')} />
      <AppForm
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          handleSubmit(values)
        }}
        validationSchema={validationSchema}
      >
        <ErrorForm
          error='Invalid email and/or password.'
          visible={loginFailed}
        />
        <AppFormEntry
          autoCapitalize='none'
          autoCorrect={false}
          icon='email'
          keyboardType='email-address'
          name='email'
          placeholder='Email'
          textContentType='emailAddress'
        />
        <AppFormEntry
          autoCapitalize='none'
          autoCorrect={false}
          icon='lock'
          name='password'
          placeholder='Password'
          textContentType='password'
          secureTextEntry
        />
        <SubmitFormButton title='Login' />
      </AppForm>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.background
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20
  }
})
