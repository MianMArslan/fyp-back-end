function httpError(message, status) {
  const error = new Error(message)
  error.name = 'OFF'
  if (status) error.status = status
  throw error
}

export { httpError }
