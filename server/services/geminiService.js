import { GoogleGenerativeAI } from '@google/generative-ai';
import { getWeatherForDestination } from './weatherService.js';
import { getDestinationPhoto } from './photoService.js';

// Dedicated AI Service Layer
class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (this.apiKey) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
    }
  }

  // Calculate days between two ISO date strings
  calculateDuration(startDateStr, endDateStr) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, Math.min(diffDays || 3, 14)); // clamp between 1 and 14 days
  }

  async generateItinerary(params) {
    const duration = this.calculateDuration(params.startDate, params.endDate);
    const weather = await getWeatherForDestination(params.destination);
    const photo = await getDestinationPhoto(params.destination);

    // Try Gemini API if key is present
    if (this.apiKey) {
      try {
        const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `
You are an expert master travel planner. Generate an ultra-detailed, personalized travel itinerary in strictly valid JSON format.
Trip Details:
- Destination: ${params.destination}
- Departure City: ${params.departureCity || 'Not specified'}
- Start Date: ${params.startDate}
- End Date: ${params.endDate} (${duration} Days)
- Travelers: ${params.travelers?.adults || 1} adults, ${params.travelers?.children || 0} children (Type: ${params.travelers?.type || 'Solo'})
- Budget: ${params.budget?.tier || 'Moderate'} tier, total approx ${params.budget?.total || 1500} ${params.budget?.currency || 'USD'}
- Travel Preferences: ${Array.isArray(params.travelPreferences) ? params.travelPreferences.join(', ') : 'Sightseeing, Culture'}
- Accommodation: ${params.accommodationPreferences?.type || 'Hotel'} (${params.accommodationPreferences?.tier || 'Moderate'})
- Transportation: ${params.transportation || 'Flight'}
- User's Custom Instructions: ${params.additionalNotes || 'Make it memorable, balanced, and authentic'}

Return ONLY a valid JSON object (no markdown code blocks, no backticks, no explanatory text):
{
  "title": "A captivating trip title",
  "summary": "2-3 sentence evocative summary of the journey",
  "vibe": "E.g. Cultural & Scenic, Relaxing Coastal, etc.",
  "itinerary": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "title": "Day 1 Title",
      "description": "Brief description of the day's focus",
      "theme": "Theme for the day",
      "morning": {
        "activities": ["Activity 1", "Activity 2"],
        "places": ["Place 1"],
        "estimatedCost": 25
      },
      "afternoon": {
        "activities": ["Activity 1"],
        "places": ["Place 2"],
        "lunchRecommendation": "Name of authentic local eatery & dish",
        "estimatedCost": 30
      },
      "evening": {
        "activities": ["Activity 1"],
        "places": ["Place 3"],
        "dinnerRecommendation": "Restaurant name & specialties",
        "estimatedCost": 45
      },
      "transportation": "Recommended local transit for today",
      "travelTime": "Total transit time e.g. 45 mins",
      "dailyEstimatedBudget": 100,
      "coordinates": { "lat": 35.0116, "lng": 135.7681 }
    }
  ],
  "expenses": {
    "transportation": 350,
    "accommodation": 500,
    "food": 320,
    "activities": 220,
    "shopping": 100,
    "miscellaneous": 60
  }
}
`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        return {
          ...parsed,
          destination: params.destination,
          departureCity: params.departureCity,
          startDate: params.startDate,
          endDate: params.endDate,
          travelers: params.travelers,
          budget: params.budget,
          travelPreferences: params.travelPreferences,
          accommodationPreferences: params.accommodationPreferences,
          transportation: params.transportation,
          additionalNotes: params.additionalNotes,
          coverImage: photo.url,
          photoSource: photo.source,
          weatherInfo: weather,
          aiProvider: 'Gemini 1.5 Flash (Live AI)',
        };
      } catch (err) {
        console.warn('[Gemini AI] Error calling live API or parsing JSON:', err.message);
        console.log('[Gemini AI] Switching seamlessly to specialized intelligent fallback generator.');
      }
    }

    // Intelligent Built-In Itinerary Synthesizer Fallback
    return this.synthesizeFallbackItinerary(params, duration, weather, photo);
  }

  synthesizeFallbackItinerary(params, duration, weather, photo) {
    const destination = params.destination || 'Kyoto, Japan';
    const totalBudget = Number(params.budget?.total) || 1600;
    const currency = params.budget?.currency || 'USD';
    const prefs = Array.isArray(params.travelPreferences) && params.travelPreferences.length > 0
      ? params.travelPreferences
      : ['Culture', 'Sightseeing', 'Food'];

    // Category distribution based on travel style
    const transportationCost = Math.round(totalBudget * 0.25);
    const accommodationCost = Math.round(totalBudget * 0.35);
    const foodCost = Math.round(totalBudget * 0.20);
    const activitiesCost = Math.round(totalBudget * 0.12);
    const shoppingCost = Math.round(totalBudget * 0.05);
    const miscCost = Math.round(totalBudget * 0.03);

    const dailyBudget = Math.round((foodCost + activitiesCost) / duration);

    // Dynamic coordinates catalog
    const cityCoords = {
      kyoto: { lat: 35.0116, lng: 135.7681 },
      paris: { lat: 48.8566, lng: 2.3522 },
      bali: { lat: -8.4095, lng: 115.1889 },
      rome: { lat: 41.9028, lng: 12.4964 },
      santorini: { lat: 36.3932, lng: 25.4615 },
      jaipur: { lat: 26.9124, lng: 75.7873 },
      banff: { lat: 51.4968, lng: -115.9281 },
      dubai: { lat: 25.2048, lng: 55.2708 },
      zermatt: { lat: 45.9765, lng: 7.7491 },
      mumbai: { lat: 19.0760, lng: 72.8777 },
      newyork: { lat: 40.7128, lng: -74.0060 },
      tokyo: { lat: 35.6762, lng: 139.6503 },
      barcelona: { lat: 41.3879, lng: 2.1699 },
    };
    const destKey = Object.keys(cityCoords).find(k => destination.toLowerCase().includes(k)) || 'kyoto';
    const baseCoords = cityCoords[destKey] || { lat: 35.0116, lng: 135.7681 };

    // Activity templates tailored by destination style
    const dayTemplates = [
      {
        theme: "Arrival, Historic Heart & First Impressions",
        title: `Welcome to ${destination} — Iconic Landmarks & Sunset Stroll`,
        morning: {
          activities: [`Arrival and check-in at your ${params.accommodationPreferences?.type || 'Hotel'}`, "Orientation stroll around the central historic district"],
          places: [`Historic Downtown ${destination}`],
          costRatio: 0.2
        },
        afternoon: {
          activities: ["Explore the primary cultural square and historic architecture", "Leisurely café break and people watching"],
          places: ["Central Plaza & Heritage Walk"],
          lunch: "Historic Bistro — Regional Chef's Daily Special",
          costRatio: 0.35
        },
        evening: {
          activities: ["Scenic sunset viewpoint", "Traditional welcome dinner with local culinary delicacies"],
          places: ["Panoramic Sunset Observation Point"],
          dinner: "Rooftop Garden Dining & Signature Tasting Menu",
          costRatio: 0.45
        },
        transit: "Airport Express & Walkable Old Town",
        time: "35 mins total transit"
      },
      {
        theme: "Cultural Deep Dive & Hidden Heritage",
        title: `Immersive Heritage & Secret Alleys of ${destination}`,
        morning: {
          activities: ["Early morning visit to historic temple / museum before peak crowds", "Guided walking tour through artisanal craft quarters"],
          places: ["Ancient Heritage Sanctuary & Gardens"],
          costRatio: 0.3
        },
        afternoon: {
          activities: ["Visit local fresh food market and sample street-level delicacies", "Interactive workshop or boutique gallery exploration"],
          places: ["Old Market Quarter & Artisan Street"],
          lunch: "Traditional Food Hall — Local noodle or pastry specialty",
          costRatio: 0.3
        },
        evening: {
          activities: ["Lantern-lit evening walk through quaint cobblestone alleys", "Live acoustic / traditional performance or tranquil waterside dining"],
          places: ["Waterfront Promenade & Historic Quarter"],
          dinner: "Locals' Favorite Trattoria / Tavern",
          costRatio: 0.4
        },
        transit: "Metro Line & Gentle Walking",
        time: "40 mins total transit"
      },
      {
        theme: "Nature, Scenic Panoramas & Outdoor Adventures",
        title: `Breathtaking Natural Landscapes & Scenic Vistas`,
        morning: {
          activities: ["Morning nature excursion to scenic trails or botanical reserve", "Photography session during optimal golden hour light"],
          places: ["Scenic Nature Reserve & Hillside Trails"],
          costRatio: 0.25
        },
        afternoon: {
          activities: ["Lakeside or mountain-view picnic lunch", "Boat ride, cable car, or panoramic cycling loop"],
          places: ["Panoramic Overlook & Alpine / Waterfront Pier"],
          lunch: "Rustic Countryside Tavern with locally sourced ingredients",
          costRatio: 0.35
        },
        evening: {
          activities: ["Relaxing spa or thermal relaxation hour", "Evening wine / tea tasting session"],
          places: ["Wellness & Tea Sanctuary"],
          dinner: "Fine Dining with Organic Farm-to-Table Fare",
          costRatio: 0.4
        },
        transit: "Regional Scenic Shuttle / Cable Car",
        time: "55 mins total transit"
      },
      {
        theme: "Art, Modern Vibrancy & Local Flavor",
        title: `Contemporary Wonders, Shopping & Night Markets`,
        morning: {
          activities: ["Visit contemporary art pavilion and architectural highlights", "Independent designer shopping and antique discoveries"],
          places: ["Design District & Contemporary Arts Center"],
          costRatio: 0.3
        },
        afternoon: {
          activities: ["Specialty coffee tasting and pastry crawl", "Visit historic castle or palace grounds"],
          places: ["Royal Castle / Palace Grounds"],
          lunch: "Artisan Deli & Handcrafted Espresso Bar",
          costRatio: 0.3
        },
        evening: {
          activities: ["Bustling evening market exploration with street music", "Craft cocktail or mocktail lounge overlooking the illuminated city skyline"],
          places: ["Night Bazaar & Skyline Lounge"],
          dinner: "Vibrant Night Market & Skewers / Tapas",
          costRatio: 0.4
        },
        transit: "City Tram & Walking",
        time: "30 mins total transit"
      },
      {
        theme: "Memorable Farewells & Hidden Gems",
        title: `Hidden Treasures, Keepsakes & Farewell Celebration`,
        morning: {
          activities: ["Visit a serene hidden garden off the usual tourist radar", "Pick up authentic souvenirs, handcrafted goods, and local treats"],
          places: ["Secret Zen Garden & Artisan Guild"],
          costRatio: 0.25
        },
        afternoon: {
          activities: ["Relaxed riverside / seaside terrace lunch", "Final panoramic stroll through your favorite neighborhood"],
          places: ["Harbor / River Terrace"],
          lunch: "Scenic Waterfront Café — Fresh Catch of the Day",
          costRatio: 0.35
        },
        evening: {
          activities: ["Celebratory farewell dinner toast", "Nighttime photography stroll through illuminated monuments"],
          places: ["Illuminated Heritage Plaza"],
          dinner: "Celebratory Tasting Experience with Wine Pairing",
          costRatio: 0.4
        },
        transit: "Private Taxi / Scenic Tram",
        time: "25 mins total transit"
      }
    ];

    const itinerary = [];
    const startDateObj = new Date(params.startDate || Date.now());

    for (let i = 0; i < duration; i++) {
      const currentDate = new Date(startDateObj);
      currentDate.setDate(startDateObj.getDate() + i);
      const dateStr = currentDate.toISOString().split('T')[0];

      const template = dayTemplates[i % dayTemplates.length];
      const dayNum = i + 1;

      // add slight coordinate jitter for realistic map spread
      const latOffset = (Math.sin(i * 1.5) * 0.015);
      const lngOffset = (Math.cos(i * 1.5) * 0.018);

      itinerary.push({
        day: dayNum,
        date: dateStr,
        title: `Day ${dayNum} — ${template.title}`,
        description: `Immerse in ${destination}'s captivating charm focusing on ${template.theme.toLowerCase()}.`,
        theme: template.theme,
        morning: {
          activities: template.morning.activities,
          places: template.morning.places,
          estimatedCost: Math.round(dailyBudget * template.morning.costRatio)
        },
        afternoon: {
          activities: template.afternoon.activities,
          places: template.afternoon.places,
          lunchRecommendation: template.afternoon.lunch,
          estimatedCost: Math.round(dailyBudget * template.afternoon.costRatio)
        },
        evening: {
          activities: template.evening.activities,
          places: template.evening.places,
          dinnerRecommendation: template.evening.dinner,
          estimatedCost: Math.round(dailyBudget * template.evening.costRatio)
        },
        transportation: template.transit,
        travelTime: template.time,
        dailyEstimatedBudget: dailyBudget,
        coordinates: {
          lat: Number((baseCoords.lat + latOffset).toFixed(4)),
          lng: Number((baseCoords.lng + lngOffset).toFixed(4))
        }
      });
    }

    return {
      title: `${duration}-Day Personalized Discovery in ${destination}`,
      summary: `A masterfully curated ${duration}-day journey designed around your preference for ${prefs.slice(0, 3).join(', ')}, taking you through ${destination}'s most breathtaking sights, culinary treasures, and authentic hidden corners within a ${params.budget?.tier || 'Moderate'} budget.`,
      vibe: `${prefs[0] || 'Cultural'} & ${prefs[1] || 'Scenic'} Escape`,
      destination: destination,
      departureCity: params.departureCity || '',
      startDate: params.startDate,
      endDate: params.endDate,
      travelers: params.travelers || { adults: 1, children: 0, type: 'Solo' },
      budget: {
        tier: params.budget?.tier || 'Moderate',
        total: totalBudget,
        currency: currency
      },
      travelPreferences: prefs,
      accommodationPreferences: params.accommodationPreferences || { type: 'Hotel', tier: 'Moderate' },
      transportation: params.transportation || 'Flight',
      additionalNotes: params.additionalNotes || '',
      coverImage: photo.url,
      photoSource: photo.source,
      weatherInfo: weather,
      aiProvider: 'TripAI Intelligent Synthesizer (Built-In AI Engine)',
      itinerary: itinerary,
      expenses: {
        transportation: transportationCost,
        accommodation: accommodationCost,
        food: foodCost,
        activities: activitiesCost,
        shopping: shoppingCost,
        miscellaneous: miscCost,
        customItems: []
      }
    };
  }

  async chatWithAssistant(messages, currentTrip) {
    const userMessage = messages[messages.length - 1]?.content || '';

    // If Gemini API is available
    if (this.apiKey) {
      try {
        const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const systemContext = currentTrip
          ? `You are TripAI, a warm, experienced travel concierge. The user is planning a trip to ${currentTrip.destination} from ${currentTrip.startDate} to ${currentTrip.endDate} with a budget of ${currentTrip.budget?.total} ${currentTrip.budget?.currency}. Travel preferences: ${currentTrip.travelPreferences?.join(', ')}. Answer concisely, practically, and with local tips.`
          : `You are TripAI, an intelligent travel assistant. Answer the user's travel questions with vivid recommendations, practical tips, and cost-saving advice.`;

        const chat = model.startChat({
          history: [
            { role: 'user', parts: [{ text: systemContext }] },
            { role: 'model', parts: [{ text: 'Understood! I am ready to help you plan and navigate your dream travel experience.' }] }
          ]
        });

        const result = await chat.sendMessage(userMessage);
        return {
          reply: result.response.text(),
          source: 'Gemini 1.5 Flash'
        };
      } catch (err) {
        console.warn('[Gemini Chat] Live API failed, using intelligent assistant engine:', err.message);
      }
    }

    // Contextual rule-based travel assistant
    const lower = userMessage.toLowerCase();
    const dest = currentTrip?.destination || 'your destination';
    const currency = currentTrip?.budget?.currency || 'USD';

    let reply = '';
    if (lower.includes('pack') || lower.includes('packing') || lower.includes('bring')) {
      reply = `🎒 **Essential Packing Tips for ${dest}:**\n- **Comfortable Footwear:** High-mileage sneakers or broken-in walking shoes for cobblestones and stairs.\n- **Layered Clothing:** A lightweight weather-resistant jacket for breezy evenings and changes in altitude.\n- **Power & Tech:** Universal travel adapter plug, 20,000mAh power bank for full-day photo taking.\n- **Travel Health:** Compact medical kit, electrolyte packs, sunscreen, and prescription medicines.\n- **Cultural Respect:** A light scarf or shawl for covering shoulders and knees when visiting temples or historic shrines.`;
    } else if (lower.includes('cheap') || lower.includes('budget') || lower.includes('reduce') || lower.includes('save money')) {
      reply = `💡 **How to optimize your budget for ${dest}:**\n1. **Local Transit Pass:** Purchase an unlimited multi-day subway/train pass instead of taking point-to-point taxis (saves ~30-40% on transit).\n2. **Lunch Specials:** Enjoy your main gourmet meal at lunch when top restaurants offer prix-fixe menus for half their dinner prices.\n3. **Free Museum Days & Walking Tours:** Check for municipal free museum days and book tip-based walking tours.\n4. **Stay slightly outside tourist centers:** Accommodations 2-3 metro stops from the center often cost 25-35% less for bigger rooms!`;
    } else if (lower.includes('food') || lower.includes('eat') || lower.includes('restaurant') || lower.includes('dish')) {
      reply = `🍜 **Must-Try Culinary Experiences in ${dest}:**\n- Seek out bustling neighborhood markets and back-alley eateries where you see lines of locals.\n- Try the signature regional dishes (ask servers for 'le plat du jour' or 'omakase / chef recommendation').\n- Avoid dining right in front of major monuments where prices are inflated and quality is tourist-tailored. Step just 2 blocks back into the residential streets!`;
    } else if (lower.includes('day 2') || lower.includes('day 1') || lower.includes('day 3') || lower.includes('itinerary')) {
      reply = `🗺️ **Itinerary Advice for ${dest}:**\nYour plan is structured to keep morning travel light and leave room for serendipitous discoveries in the afternoon. For maximum enjoyment, start your morning sightseeing by 8:30 AM to beat the mid-day bus tours, take a relaxed 90-minute lunch break, and reserve sunset for a scenic viewpoint!`;
    } else if (lower.includes('hidden gem') || lower.includes('secret') || lower.includes('off the beaten path')) {
      reply = `💎 **Secret Hidden Gems in and around ${dest}:**\n- Discover the quiet residential temple gardens and courtyard cafés early in the morning.\n- Explore the local flea markets and antique alleys where vintage treasures and handmade crafts are sold directly by artisans.\n- Visit community parks during late afternoon to experience local sunset culture!`;
    } else {
      reply = `Hello traveler! I am your TripAI Assistant. For your trip to **${dest}**, I can help you with:\n• Packing lists tailored to the local weather\n• Proven strategies to reduce travel expenses\n• Authentic restaurant and street food recommendations\n• Adjusting day-by-day activity pacing\n• Hidden gems and quiet viewpoints\n\nWhat would you like to explore next?`;
    }

    return {
      reply,
      source: 'TripAI Concierge Engine'
    };
  }

  async optimizeBudget(tripData, targetSavingsPercent = 15) {
    const expenses = tripData.expenses || {};
    const savingsRatio = targetSavingsPercent / 100;

    const optimized = {
      transportation: Math.round(expenses.transportation * (1 - savingsRatio * 0.8)),
      accommodation: Math.round(expenses.accommodation * (1 - savingsRatio * 1.1)),
      food: Math.round(expenses.food * (1 - savingsRatio * 0.7)),
      activities: Math.round(expenses.activities * (1 - savingsRatio * 0.5)),
      shopping: Math.round(expenses.shopping * (1 - savingsRatio * 1.2)),
      miscellaneous: Math.round(expenses.miscellaneous * 0.9),
    };

    const originalTotal = Object.values(expenses).reduce((a, b) => (typeof b === 'number' ? a + b : a), 0);
    const newTotal = Object.values(optimized).reduce((a, b) => a + b, 0);

    return {
      originalExpenses: expenses,
      optimizedExpenses: optimized,
      originalTotal,
      optimizedTotal: newTotal,
      savingsAmount: originalTotal - newTotal,
      savingsPercent: targetSavingsPercent,
      suggestions: [
        'Shift 2 hotel nights to charming boutique guest houses with high guest ratings.',
        'Adopt city-wide unlimited transit cards rather than booking individual taxis.',
        'Swap expensive tourist-strip dinners for authentic local neighbourhood trattorias and bistros.',
        'Take advantage of museum combo-passes and free architectural walking routes.'
      ]
    };
  }
}

export const geminiService = new GeminiService();
export default geminiService;
