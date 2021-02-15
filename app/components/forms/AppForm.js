import React from 'react'
import { Formik } from 'formik'

export default function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  setFieldValue,
  values,
  children
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, setFieldValue }) => <>{children}</>}
    </Formik>
  )
}
