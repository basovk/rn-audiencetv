import React, { useState } from 'react'
import { StyleSheet, Platform, View } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'

import Screen from '../components/Screen'
import ErrorForm from '../components/forms/ErrorForm'
import AppFormEntry from '../components/forms/AppFormEntry'
import SubmitFormButton from '../components/forms/SubmitFormButton'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import AppActivityIndicator from '../components/AppActivityIndicator'
import colors from '../config/colors'

import useApi from '../hooks/useApi'
import clientApi from '../api/clientApi'

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
  address: Yup.string().required().min(2).label('Address')
})

function RegisterScreen() {
  const registerApi = useApi(clientApi.register)
  const loginApi = useApi(clientApi.login)
  const [show, setShow] = useState(false)
  const [birthdate, setBirthdate] = useState(new Date(2001, 10, 11))
  const [gender, setGender] = useState('')
  const { login, logOut } = useAuth()
  const [error, setError] = useState()

  const handleDate = () => {
    setShow(true)
  }

  const dateForMax = new Date()
  const maxDate = dateForMax.setFullYear(2003)

  const dateForMin = new Date()
  const minDate = dateForMin.setFullYear(1920)

  const handleSubmit = async ({
    name,
    email,
    password,
    address,
    gender,
    birthdate
  }) => {
    const result = await registerApi.request(
      name,
      email,
      password,
      address,
      gender,
      birthdate
    )

    if (!result.success) {
      if (result.token) setError(result)
      else {
        setError(result)
      }
      return
    }

    console.log(name, email, password, address, gender, birthdate)
    console.log(result)

    const { token: authToken } = await loginApi.request(email, password)
    login(authToken)
  }

  return (
    <>
      <AppActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            address: '',
            gender: '',
            birthdate: new Date(2001, 10, 10)
          }}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
            /* and other goodies */
          }) => (
            <>
              <ErrorForm error={error} visible={error} />
              <AppFormEntry
                autoCorrect={false}
                icon='account'
                name='name'
                placeholder='Name'
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
                secureTextEntry
                textContentType='password'
              />
              <AppFormEntry
                autoCapitalize='none'
                autoCorrect={false}
                icon='home'
                name='address'
                placeholder='Address'
              />
              <View style={styles.pickerContainer}>
                <AppText style={styles.label}>Gender: </AppText>
                <Picker
                  name='gender'
                  selectedValue={gender}
                  style={styles.picker}
                  onValueChange={(itemValue) => {
                    console.log(itemValue)
                    setGender(itemValue)
                    setFieldValue('gender', itemValue)
                  }}
                >
                  <Picker.Item name='gender' label='Male' value='Male' />
                  <Picker.Item name='gender' label='Female' value='Female' />
                </Picker>
              </View>
              <AppButton title='Select your birthdate' onPress={handleDate} />
              {show && (
                <DateTimePicker
                  name='birthdate'
                  testID='birthdate'
                  value={birthdate}
                  display='default'
                  onChange={(e, selectedDate) => {
                    const currentDate = selectedDate || birthdate
                    setShow(Platform.OS === 'ios')
                    setBirthdate(currentDate)
                    setFieldValue('birthdate', currentDate)
                    console.log(e)
                    if (e.type) {
                      setShow(false)
                    }
                  }}
                  maximumDate={maxDate}
                  minimumDate={minDate}
                />
              )}
              <SubmitFormButton title='Register' />
            </>
          )}
        </Formik>
      </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.background
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  label: {
    color: colors.text,
    fontSize: 18
  },
  picker: {
    marginLeft: 10,
    height: 70,
    width: 150
  }
})

export default RegisterScreen
