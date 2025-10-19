const DATA_URL = "https://microsoftedge.github.io/Demos/json-dummy-data/5MB.json"

// Cache for the fetched data
let cachedData: any[] | null = null

export async function fetchJsonData(): Promise<any[]> {
  // Return cached data if available
  if (cachedData) {
    return cachedData
  }

  try {
    const response = await fetch(DATA_URL)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Handle both array and object with data property
    const arrayData = Array.isArray(data) ? data : data.data || []

    // Cache the data
    cachedData = arrayData

    return arrayData
  } catch (error) {
    console.error("Failed to fetch data:", error)
    throw new Error("Failed to fetch data from the endpoint")
  }
}
