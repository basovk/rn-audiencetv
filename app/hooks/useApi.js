import { useState } from 'react'

export default useApi = (apiFunc) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const request = async (...args) => {
    setLoading(true)
    const result = await apiFunc(...args)
    setLoading(false)

    if (!result.success) {
      setError(true)
      return result
    }

    setError(false)
    setData(result)
    return result
  }

  return {
    request,
    data,
    error,
    loading
  }
}
