# TripAI — Full-Stack AI Travel Planner Web Application

> **"Your next adventure, planned by AI."**
> A modern, responsive, full-stack travel planning platform inspired by Airbnb, Booking.com, and premium SaaS dashboards.

---

## 🌟 Key Features

1. **Cinematic Landing Page**
   - Hero section with inspiring travel photography and headline: *"Your next adventure, planned by AI."*
   - Interactive quick travel planning search form (destination, departure, dates, budget, travelers).
   - Floating destination preview cards with smooth transitions.
   - Trending destination grid with instant "Plan Trip" triggers.
   - Travel styles showcase (Culture, Beaches, Mountains, Food, Adventure, Relaxation).
   - "Why TripAI" feature highlights, testimonials, and newsletter signup.

2. **8-Step AI Trip Planner Wizard**
   - **Step 1: Destination** — City, country, and quick-select trending suggestions.
   - **Step 2: Dates** — Departure & return dates with real-time auto-calculated duration and nights.
   - **Step 3: Travelers** — Adults, children counters and style (Solo, Couple, Family, Friends).
   - **Step 4: Budget** — Budget, Moderate, Luxury tiers or custom amount in USD, INR, EUR, GBP, etc.
   - **Step 5: Travel Preferences** — Adventure, Nature, Beaches, Mountains, Historical places, Culture, Food, Shopping, Nightlife, Photography, Relaxation, Spiritual places.
   - **Step 6: Transportation** — Commercial Flight, Train, Bus, Car, Rental vehicle.
   - **Step 7: Accommodation** — Hotel, Hostel, Resort, Airbnb, Budget stays, 5-Star Luxury.
   - **Step 8: AI Notes & Custom Instructions** — Freeform text with one-click guideline chips (*"Avoid crowded spots", "Focus on local street food", "Scenic train journeys"*).

3. **AI-Generated Itinerary**
   - **Trip Overview**: Hero destination cover image, dates, travelers, total budget, live/estimated weather badge, vibe tag.
   - **Day-by-Day Timeline**: Morning, afternoon, and evening schedules with key attractions, lunch & dinner restaurant recommendations, estimated itemized costs, and local transit advice.
   - **Interactive Route Map**: Leaflet & OpenStreetMap rendering numbered day markers, popups, and route trajectory connecting destinations.
   - **Weather Outlook**: Current temperature, conditions, wind, humidity, and clear indication of live vs seasonal demo climate.
   - **Export Options**: One-click **PDF export / print**, shareable link generation, and database saving.

4. **Dynamic Travel Budget Calculator**
   - Categorized expenses: Transportation, Accommodation, Food & Dining, Activities, Shopping, and Miscellaneous.
   - Interactive **animated SVG donut chart** showing percentage share.
   - Total estimated cost, per-person cost, daily average cost, and budget remaining indicator.
   - **Manual Cost Modification**: Edit amounts in-place to adjust targets.
   - **AI Budget Optimization**: 1-click optimization that suggests practical ways to save 15-20% and updates allocations.

5. **Explore Destinations Catalog**
   - Multi-filter discovery: search by keyword, filter by continent/country, budget tier, and category style.
   - Sort by popularity, rating, cost (low-to-high, high-to-low).
   - **Destination Details Modal**: Photo gallery carousel, destination overview, must-visit attractions, local cuisine to savor, and expert travel tips.
   - Quick "Save to Favorites" heart toggle.

6. **User Authentication & Dashboard ("My Trips")**
   - Registration, login, and JWT session persistence.
   - Password hashing with bcrypt.
   - User profile dropdown with avatar initials.
   - **My Trips Dashboard** with tabs: *All Trips, Upcoming, Planning, Completed, and Saved Favorites*.
   - Actions: View Itinerary, Duplicate Trip, Share Trip, Export PDF, Delete Trip.

7. **Context-Aware AI Travel Chatbot Concierge**
   - Floating widget accessible across all pages.
   - Retains context of the user's active trip (destination, dates, budget, activities).
   - Quick prompt shortcuts: *"What should I pack?", "Can I reduce this trip's budget?", "What should I visit on Day 2?", "What are the best local foods?", "Suggest hidden gems"*.

---

## 🛠️ Technology Stack

### Frontend
- **React.js 18** with **Vite**
- **Tailwind CSS** with custom premium palette (Navy Blue, Turquoise, Warm Beige, Coral CTA)
- **React Router DOM v6**
- **Lucide React** icons
- **Axios** with JWT interceptors
- **Leaflet & React-Leaflet** for interactive maps
- **Canvas-Confetti** for celebration feedback
- **React Context API** (`AuthContext`, `TripContext`, `ToastContext`)

### Backend
- **Node.js** & **Express.js** REST API
- **Google Gemini API** (`@google/generative-ai`) with intelligent fallback engine
- **MongoDB & Mongoose** with local persistent fallback JSON store for zero-setup execution
- **JWT Authentication** (`jsonwebtoken`) & **bcryptjs** password hashing
- **OpenWeather API** integration + seasonal climate estimation
- **Unsplash API** integration + curated photography database

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v18+ (bundled in `.tools/node/bin` in this repository)
- npm v9+

### 2. Environment Variables
Backend configuration in `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/tripai
JWT_SECRET=tripai_super_secret_jwt_key_2026_production_grade
GEMINI_API_KEY=your_gemini_api_key_here  # Optional: falls back gracefully to built-in AI synthesizer
OPENWEATHER_API_KEY=your_openweather_key  # Optional: falls back to seasonal climate estimates
UNSPLASH_ACCESS_KEY=your_unsplash_key    # Optional: falls back to curated photo catalog
```

### 3. Running the Application
From the project root:

**Terminal 1 (Backend API):**
```bash
export PATH="$(pwd)/.tools/node/bin:$PATH"
cd server
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
export PATH="$(pwd)/.tools/node/bin:$PATH"
npm run dev
# Frontend runs on http://localhost:5173
```

### 4. Running the Test Suite
To execute the automated end-to-end integration test:
```bash
export PATH="$(pwd)/.tools/node/bin:$PATH"
node test_flows.mjs
```

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/health` | Service health status | No |
| `POST` | `/api/auth/register` | Register new user | No |
| `POST` | `/api/auth/login` | User login | No |
| `GET` | `/api/auth/me` | Fetch current user session | Yes |
| `POST` | `/api/auth/forgot-password` | Password reset request | No |
| `POST` | `/api/ai/generate-itinerary` | Generate AI travel plan | No |
| `POST` | `/api/ai/chat` | AI concierge chat with trip context | No |
| `POST` | `/api/ai/optimize-budget` | AI budget optimization | No |
| `GET` | `/api/destinations` | List filtered destinations | No |
| `GET` | `/api/destinations/:id` | Get destination details | No |
| `GET` | `/api/destinations/search` | Keyword destination search | No |
| `POST` | `/api/trips` | Save generated trip | Yes |
| `GET` | `/api/trips` | Get user saved trips | Yes |
| `GET` | `/api/trips/:id` | Get trip by ID | No (public share) |
| `PUT` | `/api/trips/:id` | Update trip / expenses | Yes |
| `DELETE` | `/api/trips/:id` | Delete trip | Yes |
| `POST` | `/api/trips/:id/duplicate`| Clone trip | Yes |
| `POST` | `/api/favorites` | Toggle favorite destination | Yes |
| `GET` | `/api/favorites` | Get user favorited places | Yes |
# AI-Travel-Planner-Web-Application
