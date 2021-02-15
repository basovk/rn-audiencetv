import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

export default function AppDateTimePicker({ name, showing, ...otherProps }) {
  const { setFieldValue, values } = useFormikContext()
  const [birthdate, setBirthdate] = useState(new Date(2001, 10, 11))

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || null

    console.log(currentDate)
    const dateFromForm = moment(currentDate).format('YYYY-MM-DD')
    console.log(dateFromForm)
    setBirthdate(selectedDate)
    setFieldValue(name, dateFromForm)
    setFormikState(showing, false)
  }

  const dateForMax = new Date()
  const maxDate = dateForMax.setFullYear(2003)

  const dateForMin = new Date()
  const minDate = dateForMin.setFullYear(1920)

  return (
    <DateTimePicker
      testID={name}
      value={birthdate}
      display='default'
      onChange={onChange}
      maximumDate={maxDate}
      minimumDate={minDate}
      {...otherProps}
    />
  )
}
