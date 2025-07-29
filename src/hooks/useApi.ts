'use client'
import { useState, useEffect } from 'react'

export function useApi<T>(fetchFn: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchFn()
        if (!cancelled) setData(result)
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, deps)

  return { data, loading, error }
}