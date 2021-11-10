import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { AppState } from 'App/reducers'

export function useExpired() {
  const expires_in = useSelector((state: AppState) => state.auth.expires_in)
  console.log('expires_in', expires_in)
  function isExpired(timestamp?: string) {
    if (!timestamp) {
      return true
    }

    const last = dayjs(timestamp)
    const now = dayjs()
    const diff = now.diff(last, 'seconds')

    if (diff > expires_in) {
      return true
    }

    return false
  }

  return { isExpired }
}
