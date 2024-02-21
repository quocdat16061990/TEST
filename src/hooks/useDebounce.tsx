import { useState, useEffect } from 'react'

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return (): void => {
      clearTimeout(handleDebounce)
    }
  }, [value, delay])

  return debouncedValue
}
export default useDebounce
