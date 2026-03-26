# 🌾 BukidCheck — Farm Task Weather Planner

A weather-based farm task feasibility checker built for Filipino farmers. BukidCheck helps agricultural workers plan their daily tasks by analyzing current and forecasted weather conditions and determining whether a task is safe to perform.

## 🌐 Live Demo

[bukid-check.vercel.app](https://bukid-check.vercel.app)

## 📸 Screenshots

<img width="1905" height="869" alt="image" src="https://github.com/user-attachments/assets/411940f9-d9af-4a6b-981e-f339909055e7" />


## 🚀 Features

- **Location Search** — Search any barangay, municipality, or city in the Philippines using OpenStreetMap's Nominatim API
- **Live Weather Data** — Fetches real-time and 3-day hourly weather forecasts via Open-Meteo (no API key required)
- **12 Farm Task Profiles** — Pre-built activity profiles covering planting, crop care, harvesting, soil work, post-harvest, and livestock tasks
- **Custom Task Input** — Type any farm task not in the list — a keyword matcher maps it to the closest activity profile
- **Start Time Selection** — Choose "Now" or set a custom future start time for planned tasks
- **Feasibility Analysis** — Analyzes rain probability, wind speed, humidity, and temperature against task-specific thresholds
- **Smart Verdict** — Returns Good to Go, Risky, or Not Recommended based on the worst conditions in your activity window
- **Best Window Suggestion** — Scans the next 3 days (daytime hours only, 5 AM–6 PM) to find the optimal time to perform the task
- **Farming Tips** — Combines hardcoded agricultural best practices with dynamic weather-specific advice
- **Responsive Design** — Works on both desktop and mobile browsers

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18 + Vite                     |
| Styling   | Pure CSS with CSS custom properties |
| Location  | Nominatim (OpenStreetMap) API       |
| Weather   | Open-Meteo API                      |
| Fonts     | Syne + Inter (Google Fonts)         |
| Deploy    | Vercel                              |

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/jms-ry/farm-task-weather-planner.git
cd farm-task-weather-planner

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

## 🌤 APIs Used

### Open-Meteo
- **URL:** `https://api.open-meteo.com/v1/forecast`
- **Cost:** Free, no API key required
- **Usage:** Fetches current weather and hourly forecasts for up to 3 days
- **Fields:** Temperature, apparent temperature, humidity, wind speed, precipitation probability, weather code

### Nominatim (OpenStreetMap)
- **URL:** `https://nominatim.openstreetmap.org/search`
- **Cost:** Free, no API key required
- **Usage:** Location search and geocoding (returns lat/lon for weather lookup)
- **Rate limit:** 1 request/second — debounced at 500ms in the app

## 🌾 Supported Farm Tasks

| Task | Category |
|------|----------|
| Transplanting | Planting |
| Seed Sowing | Planting |
| Pesticide Spraying | Crop Care |
| Fertilizer Applying | Crop Care |
| Irrigation | Crop Care |
| Rice Harvesting | Harvesting |
| Fruit Picking | Harvesting |
| Plowing | Soil Work |
| Composting | Soil Work |
| Sun Drying Grains | Post-harvest |
| Threshing | Post-harvest |
| Livestock Grazing | Livestock |

## ⚙️ How the Feasibility Engine Works

1. **Activity Profile** — Each task has defined thresholds for rain, wind, humidity, and temperature (risky and bad levels)
2. **Weather Window** — Extracts hourly forecast data for the selected start time and duration
3. **Verdict Logic** — If any hour in the window crosses a "bad" threshold → **Not Recommended**. If any hour crosses "risky" → **Risky**. Otherwise → **Good to Go**
4. **Best Window** — Scans future daytime hours (5 AM–6 PM) across 3 days and scores each window by weather conditions, returning the lowest-score window
5. **Tips** — Combines 3 base agricultural tips per task with dynamic tips generated from actual weather values in the window

## ⚠️ Disclaimer

Weather forecasts are **not 100% accurate**. BukidCheck is a planning aid only — always use your own judgment and local knowledge when making farm decisions.
