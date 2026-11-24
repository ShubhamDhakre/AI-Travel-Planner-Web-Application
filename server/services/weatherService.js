import axios from 'axios';

export const getWeatherForDestination = async (destinationCity) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (apiKey) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(destinationCity)}&units=metric&appid=${apiKey}`
      );
      const data = response.data;
      return {
        temperature: `${Math.round(data.main.temp)}°C`,
        condition: data.weather[0]?.main || 'Clear',
        icon: data.weather[0]?.icon || '01d',
        humidity: `${data.main.humidity}%`,
        windSpeed: `${Math.round(data.wind.speed * 3.6)} km/h`,
        forecast: `Current conditions: ${data.weather[0]?.description}, feels like ${Math.round(data.main.feels_like)}°C.`,
        isLive: true,
        source: 'OpenWeather Live API',
      };
    } catch (err) {
      console.warn(`[OpenWeather] Failed to fetch live weather for ${destinationCity}: ${err.message}. Using fallback.`);
    }
  }

  // Fallback demo data clearly identified
  const cityClimates = {
    kyoto: { temp: '19°C', cond: 'Pleasant', icon: 'sun', forecast: 'Clear skies with pleasant autumn breeze.' },
    paris: { temp: '17°C', cond: 'Mild', icon: 'cloud-sun', forecast: 'Scattered clouds with mild afternoon temperatures.' },
    bali: { temp: '29°C', cond: 'Tropical Warmth', icon: 'sun', forecast: 'Warm and sunny with gentle tropical trade winds.' },
    swiss: { temp: '9°C', cond: 'Crisp Alpine', icon: 'snowflake', forecast: 'Crisp mountain air, high visibility across peaks.' },
    zermatt: { temp: '6°C', cond: 'Crisp Alpine', icon: 'snowflake', forecast: 'Chilly morning, clear skies over the Matterhorn.' },
    rome: { temp: '22°C', cond: 'Sunny', icon: 'sun', forecast: 'Warm Mediterranean sunshine, ideal for outdoor walks.' },
    santorini: { temp: '24°C', cond: 'Breezy & Sunny', icon: 'sun', forecast: 'Brilliant Aegean sunshine with refreshing sea breezes.' },
    jaipur: { temp: '27°C', cond: 'Dry & Sunny', icon: 'sun', forecast: 'Pleasant afternoon, warm sun, cool evening temperatures.' },
    banff: { temp: '12°C', cond: 'Alpine Fresh', icon: 'cloud-sun', forecast: 'Cool mountain air, brilliant emerald lake reflections.' },
    dubai: { temp: '31°C', cond: 'Warm & Clear', icon: 'sun', forecast: 'Sunny desert conditions with low humidity.' },
    newyork: { temp: '18°C', cond: 'Clear', icon: 'sun', forecast: 'Crisp autumn weather, great visibility.' },
    tokyo: { temp: '20°C', cond: 'Clear', icon: 'sun', forecast: 'Pleasant city walking climate.' },
    mumbai: { temp: '30°C', cond: 'Warm & Humid', icon: 'cloud-sun', forecast: 'Warm coastal breezes along Marine Drive.' },
  };

  const key = Object.keys(cityClimates).find(c => destinationCity.toLowerCase().includes(c));
  const selected = key ? cityClimates[key] : { temp: '21°C', cond: 'Mild & Clear', icon: 'sun', forecast: 'Comfortable seasonal climate for sightseeing.' };

  return {
    temperature: selected.temp,
    condition: selected.cond,
    icon: selected.icon,
    forecast: selected.forecast,
    isLive: false,
    source: 'Seasonal Climate Estimation (API key not configured)',
  };
};
