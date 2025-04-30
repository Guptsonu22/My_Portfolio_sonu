"use client"

import { useState, useEffect } from "react"

export default function ExampleComponent() {
  const [data, setData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const result = await response.text()
        setData(result)
      } catch (err) {
        setError("Failed to fetch data")
        console.error("Error:", err)
      }
    }

    fetchData()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h2>Example Data:</h2>
      {data ? <pre>{data}</pre> : <p>Loading...</p>}
    </div>
  )
}
