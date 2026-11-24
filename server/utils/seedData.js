export const initialDestinations = [
  {
    name: "Kyoto",
    country: "Japan",
    continent: "Asia",
    description: "The cultural heart of Japan, Kyoto boasts over a thousand classical Buddhist temples, serene Zen gardens, historic geisha districts, and ethereal bamboo groves.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1000&q=80"
    ],
    attractions: [
      "Fushimi Inari-taisha Shrine",
      "Kinkaku-ji (Golden Pavilion)",
      "Arashiyama Bamboo Grove",
      "Gion Historic District",
      "Kiyomizu-dera Temple"
    ],
    averageBudget: {
      amount: 1800,
      currency: "USD",
      level: "Moderate"
    },
    bestTimeToVisit: "March to May (Cherry Blossoms) & October to November (Autumn Foliage)",
    categories: ["Culture", "Historical places", "Food", "Photography", "Spiritual places"],
    rating: 4.9,
    reviewsCount: 342,
    localCuisine: ["Kaiseki Ryori", "Matcha Sweets", "Kyoto Tofu (Yudofu)", "Ramen", "Yatsuhashi"],
    travelTips: [
      "Purchase an IC card (ICOCA/Suica) for smooth bus and train commuting.",
      "Visit Fushimi Inari at dawn (6:00 AM) to experience the torii gates without crowds.",
      "Book traditional ryokan stays at least 3 months in advance."
    ],
    nearbyDestinations: ["Osaka", "Nara", "Uji", "Kobe"],
    coordinates: { lat: 35.0116, lng: 135.7681 }
  },
  {
    name: "Paris",
    country: "France",
    continent: "Europe",
    description: "The City of Light captivates travelers with monumental architecture, timeless art museums, bohemian café culture, and world-renowned gastronomy.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520939817895-060bdef4ad1b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?auto=format&fit=crop&w=1000&q=80"
    ],
    attractions: [
      "Eiffel Tower & Champ de Mars",
      "Louvre Museum",
      "Montmartre & Sacré-Cœur",
      "Musée d'Orsay",
      "Seine River Cruise"
    ],
    averageBudget: {
      amount: 2200,
      currency: "USD",
      level: "Luxury"
    },
    bestTimeToVisit: "April to June & September to November",
    categories: ["Culture", "Historical places", "Food", "Shopping", "Photography"],
    rating: 4.8,
    reviewsCount: 520,
    localCuisine: ["Fresh Croissants & Baguettes", "Duck Confit", "Steak Frites", "Macarons", "Boeuf Bourguignon"],
    travelTips: [
      "Reserve Louvre and Eiffel Tower tickets weeks in advance online.",
      "Always greet shopkeepers and servers with a polite 'Bonjour'.",
      "Take the Paris Metro; it's the fastest and most efficient way across arrondissements."
    ],
    nearbyDestinations: ["Versailles", "Giverny", "Fontainebleau", "Champagne Region"],
    coordinates: { lat: 48.8566, lng: 2.3522 }
  },
  {
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    description: "A tropical paradise featuring emerald terraced rice paddies, mystical seaside temples, world-class surf breaks, and serene holistic wellness retreats.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1000&q=80"
    ],
    attractions: [
      "Uluwatu Temple Sunset",
      "Tegallalang Rice Terraces",
      "Ubud Monkey Forest Sanctuary",
      "Mount Batur Sunrise Trek",
      "Tanah Lot Water Temple"
    ],
    averageBudget: {
      amount: 1100,
      currency: "USD",
      level: "Budget"
    },
    bestTimeToVisit: "April to October (Dry Season)",
    categories: ["Beaches", "Nature", "Relaxation", "Adventure", "Spiritual places"],
    rating: 4.9,
    reviewsCount: 410,
    localCuisine: ["Nasi Goreng", "Babi Guling", "Satay Lilit", "Bebek Betutu", "Fresh Coconut Water"],
    travelTips: [
      "Wear respectful attire (sarong provided at entrances) when visiting temples.",
      "Rent a scooter only if you are an experienced driver; otherwise hire a private car with driver."
    ],
    nearbyDestinations: ["Nusa Penida", "Gili Islands", "Lombok"],
    coordinates: { lat: -8.4095, lng: 115.1889 }
  },
  {
    name: "Swiss Alps (Zermatt & Interlaken)",
    country: "Switzerland",
    continent: "Europe",
    description: "Dramatic mountain peaks, crystalline alpine lakes, scenic panoramic trains, and iconic views of the majestic Matterhorn.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1000&q=80"
    ],
    attractions: [
      "Matterhorn Glacier Paradise",
      "Jungfraujoch - Top of Europe",
      "Lake Brienz & Lake Thun",
      "Gornergrat Railway",
      "Lauterbrunnen Valley of 72 Waterfalls"
    ],
    averageBudget: {
      amount: 2800,
      currency: "USD",
      level: "Luxury"
    },
    bestTimeToVisit: "June to September for hiking, December to March for skiing",
    categories: ["Mountains", "Nature", "Adventure", "Photography", "Relaxation"],
    rating: 4.95,
    reviewsCount: 298,
    localCuisine: ["Swiss Cheese Fondue", "Raclette", "Rösti", "Swiss Chocolate", "Zürcher Geschnetzeltes"],
    travelTips: [
      "Get a Swiss Travel Pass for unlimited rides on trains, buses, and scenic mountain railways.",
      "Pack multi-layered clothing as high-altitude weather shifts quickly."
    ],
    nearbyDestinations: ["Lucerne", "Geneva", "Zurich", "Montreux"],
    coordinates: { lat: 45.9765, lng: 7.7491 }
  },
  {
    name: "Rome",
    country: "Italy",
    continent: "Europe",
    description: "An open-air living museum where millennial antiquity meets vibrant Mediterranean street life, trattorias, and breathtaking piazzas.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1000&q=80"
    ],
    attractions: [
      "Colosseum & Roman Forum",
      "Vatican Museums & Sistine Chapel",
      "Pantheon",
      "Trevi Fountain",
      "Piazza Navona"
    ],
    averageBudget: {
      amount: 1750,
      currency: "USD",
      level: "Moderate"
    },
    bestTimeToVisit: "April to May & September to October",
    categories: ["Historical places", "Culture", "Food", "Photography"],
    rating: 4.85,
    reviewsCount: 480,
    localCuisine: ["Cacio e Pepe", "Carbonara", "Supplì", "Roman Pizza", "Artisanal Gelato"],
    travelTips: [
      "Toss a coin into the Trevi Fountain with your right hand over left shoulder to ensure your return.",
      "Cover knees and shoulders when entering St. Peter's Basilica."
    ],
    nearbyDestinations: ["Florence", "Amalfi Coast", "Tivoli", "Naples"],
    coordinates: { lat: 41.9028, lng: 12.4964 }
  },
  {
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    description: "Iconic whitewashed cubic villages perched high upon caldera cliffs overlooking the deep azure Aegean Sea, famed for unforgettable sunsets.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
    ],
    attractions: [
      "Oia Blue Domed Sunset Point",
      "Fira to Oia Caldera Hike",
      "Red Beach & Akrotiri Ruins",
      "Amoudi Bay Seafood Harbor",
      "Volcanic Wine Tasting"
    ],
    averageBudget: {
      amount: 2100,
      currency: "USD",
      level: "Luxury"
    },
    bestTimeToVisit: "May to October",
    categories: ["Beaches", "Relaxation", "Photography", "Food"],
    rating: 4.9,
    reviewsCount: 388,
    localCuisine: ["Tomato Gefthedes", "Fresh Grilled Octopus", "Fava Me Koukia", "Assyrtiko Wine", "Baklava"],
    travelTips: [
      "Wear sturdy walking shoes for the cobblestone caldera staircases.",
      "Arrive at Oia 90 minutes before sunset to secure a scenic viewpoint."
    ],
    nearbyDestinations: ["Mykonos", "Crete", "Paros", "Naxos"],
    coordinates: { lat: 36.3932, lng: 25.4615 }
  },
  {
    name: "Jaipur",
    country: "India",
    continent: "Asia",
    description: "The famed 'Pink City' of Rajasthan is an architectural wonderland of royal palaces, hilltop fortifications, vibrant bazaars, and rich Rajput heritage.",
    image: "https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80"
    ],
    attractions: [
      "Hawa Mahal (Palace of Winds)",
      "Amber Palace Fort & Sheesh Mahal",
      "City Palace & Museum",
      "Jantar Mantar Astronomical Observatory",
      "Nahargarh Fort Sunset Point"
    ],
    averageBudget: {
      amount: 850,
      currency: "USD",
      level: "Budget"
    },
    bestTimeToVisit: "October to March (Pleasant winter season)",
    categories: ["Historical places", "Culture", "Shopping", "Food", "Photography"],
    rating: 4.8,
    reviewsCount: 310,
    localCuisine: ["Dal Baati Churma", "Laal Maas", "Pyaaz Kachori", "Ghewar", "Masala Chai"],
    travelTips: [
      "Hire an authorized local guide at Amber Fort for fascinating historical tales.",
      "Bargain politely in Johari Bazaar and Bapu Bazaar for textiles and blue pottery."
    ],
    nearbyDestinations: ["Udaipur", "Jodhpur", "Agra (Taj Mahal)", "New Delhi"],
    coordinates: { lat: 26.9124, lng: 75.7873 }
  },
  {
    name: "Banff National Park",
    country: "Canada",
    continent: "North America",
    description: "Canada's oldest national park features turquoise glacial lakes, rugged snowcapped Canadian Rockies, hot springs, and abundant wildlife.",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
    ],
    attractions: [
      "Lake Louise & Plain of Six Glaciers",
      "Moraine Lake & Valley of the Ten Peaks",
      "Banff Gondola & Sulphur Mountain",
      "Icefields Parkway Drive",
      "Johnston Canyon Waterfalls"
    ],
    averageBudget: {
      amount: 1950,
      currency: "USD",
      level: "Moderate"
    },
    bestTimeToVisit: "June to August (Lakes thawed) & December to March (Ski season)",
    categories: ["Mountains", "Nature", "Adventure", "Photography"],
    rating: 4.95,
    reviewsCount: 275,
    localCuisine: ["Alberta Bison Ribs", "Poutine", "Maple Glazed Salmon", "BeaverTails Pastry"],
    travelTips: [
      "Park shuttles must be booked in advance for Moraine Lake access.",
      "Carry bear spray and know how to safely use it on trails."
    ],
    nearbyDestinations: ["Jasper National Park", "Canmore", "Calgary"],
    coordinates: { lat: 51.4968, lng: -115.9281 }
  },
  {
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    description: "Where dramatic cliffs meet two oceans, Cape Town shines with Table Mountain, penguin colonies at Boulders Beach, and historic Cape Winelands.",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80"
    ],
    attractions: [
      "Table Mountain Aerial Cableway",
      "Cape Point & Cape of Good Hope",
      "Boulders Beach African Penguins",
      "Kirstenbosch Botanical Gardens",
      "V&A Waterfront"
    ],
    averageBudget: {
      amount: 1450,
      currency: "USD",
      level: "Moderate"
    },
    bestTimeToVisit: "November to March (Summer)",
    categories: ["Nature", "Beaches", "Adventure", "Food", "Photography"],
    rating: 4.88,
    reviewsCount: 220,
    localCuisine: ["Bobotie", "Braai Barbecue", "Cape Malay Curry", "Fresh Seafood", "Pinotage Wine"],
    travelTips: [
      "Ride the Table Mountain cableway on the first clear sunny day.",
      "Rent a car to drive scenic Chapman's Peak Drive."
    ],
    nearbyDestinations: ["Stellenbosch Winelands", "Hermanus", "Franschhoek"],
    coordinates: { lat: -33.9249, lng: 18.4241 }
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    continent: "Middle East",
    description: "A futuristic desert metropolis boasting gravity-defying skyscrapers, luxury shopping malls, historic creek souks, and thrilling desert safaris.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80"
    ],
    attractions: [
      "Burj Khalifa Observation Deck",
      "Dubai Mall & Dubai Fountain Show",
      "Desert 4x4 Dune Safari",
      "Museum of the Future",
      "Palm Jumeirah & Atlantis"
    ],
    averageBudget: {
      amount: 2400,
      currency: "USD",
      level: "Luxury"
    },
    bestTimeToVisit: "November to March (Pleasant outdoor weather)",
    categories: ["Shopping", "Nightlife", "Adventure", "Culture"],
    rating: 4.75,
    reviewsCount: 430,
    localCuisine: ["Shawarma", "Al Harees", "Machboos", "Luqaimat Sweet Dumplings", "Arabic Coffee"],
    travelTips: [
      "Dress respectfully when visiting religious and traditional heritage sites.",
      "Book Burj Khalifa sunset slot 2 weeks in advance."
    ],
    nearbyDestinations: ["Abu Dhabi", "Sharjah", "Ras Al Khaimah"],
    coordinates: { lat: 25.2048, lng: 55.2708 }
  }
];
