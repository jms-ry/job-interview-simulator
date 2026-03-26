const NOMINATIM_URL = 'https://nominatim.openstreetmap.org'

export async function searchLocation(query) {
  if (!query || query.trim().length < 3) return []

  const params = new URLSearchParams({
    q: query,
    format: 'json',
    addressdetails: 1,
    limit: 5,
    countrycodes: 'ph',
  })

  const response = await fetch(`${NOMINATIM_URL}/search?${params}`, {
    headers: {
      'Accept-Language': 'en',
      'User-Agent': 'BukidCheck/1.0',
    },
  })

  if (!response.ok) throw new Error('Location search failed')

  const data = await response.json()

  return data.map(item => ({
    id: item.place_id,
    label: item.display_name,
    shortLabel: formatShortLabel(item),
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),
  }))
}

function formatShortLabel(item) {
  const a = item.address
  const parts = [
    a.village || a.hamlet || a.suburb,
    a.town || a.city || a.municipality,
    a.province || a.state,
  ].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : item.display_name.split(',').slice(0, 3).join(',')
}