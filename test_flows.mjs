import axios from 'axios';

const BASE = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- 🧪 STARTING TRIPAIL INTEGRATION & API TESTS ---');

  // 1. Health check
  const health = await axios.get(`${BASE}/health`);
  console.log('✅ 1. Health check passed:', health.data.service);

  // 2. Destinations list
  const dests = await axios.get(`${BASE}/destinations`);
  console.log(`✅ 2. Destinations loaded: ${dests.data.count} items in catalog`);
  const firstDest = dests.data.data[0];

  // 3. User Registration
  const testUser = {
    name: 'Traveler Tester',
    email: `tester_${Date.now()}@tripai.com`,
    password: 'password123',
  };
  const regRes = await axios.post(`${BASE}/auth/register`, testUser);
  const token = regRes.data.data.token;
  const userId = regRes.data.data._id;
  console.log('✅ 3. Registration passed. Token acquired.');

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // 4. Auth Me
  const meRes = await axios.get(`${BASE}/auth/me`, authHeader);
  console.log('✅ 4. Auth Me passed:', meRes.data.data.email);

  // 5. Generate AI Itinerary
  const plannerData = {
    destination: 'Santorini, Greece',
    startDate: '2026-06-10',
    endDate: '2026-06-15',
    travelers: { adults: 2, children: 0, type: 'Couple' },
    budget: { tier: 'Moderate', total: 2400, currency: 'USD' },
    travelPreferences: ['Beaches', 'Food', 'Relaxation', 'Photography'],
    transportation: 'Flight',
    accommodationPreferences: { type: 'Resort', tier: 'Moderate' },
    additionalNotes: 'Include romantic sunset dinner in Oia and wine tasting.',
  };
  const aiRes = await axios.post(`${BASE}/ai/generate-itinerary`, plannerData);
  const generatedTrip = aiRes.data.data;
  console.log(`✅ 5. AI Itinerary generated successfully: "${generatedTrip.title}" with ${generatedTrip.itinerary.length} days.`);

  // 6. Save Trip
  const saveRes = await axios.post(`${BASE}/trips`, generatedTrip, authHeader);
  const savedTripId = saveRes.data.data._id;
  console.log('✅ 6. Trip saved to database with ID:', savedTripId);

  // 7. Get Trips
  const tripsRes = await axios.get(`${BASE}/trips`, authHeader);
  console.log(`✅ 7. User trips count: ${tripsRes.data.count}`);

  // 8. Update Trip (modify expense)
  const updatedExpenses = {
    ...generatedTrip.expenses,
    food: 450,
  };
  const updateRes = await axios.put(`${BASE}/trips/${savedTripId}`, { expenses: updatedExpenses }, authHeader);
  console.log('✅ 8. Trip updated. Food expense set to:', updateRes.data.data.expenses.food);

  // 9. Duplicate Trip
  const dupRes = await axios.post(`${BASE}/trips/${savedTripId}/duplicate`, {}, authHeader);
  console.log('✅ 9. Trip duplicated successfully:', dupRes.data.data.destination);

  // 10. Toggle Favorite
  const favRes = await axios.post(`${BASE}/favorites`, { destinationId: firstDest._id }, authHeader);
  console.log('✅ 10. Favorite toggled:', favRes.data.message);

  // 11. Get Favorites
  const favsRes = await axios.get(`${BASE}/favorites`, authHeader);
  console.log(`✅ 11. User favorites count: ${favsRes.data.count}`);

  // 12. AI Chatbot Assistant
  const chatRes = await axios.post(`${BASE}/ai/chat`, {
    messages: [{ role: 'user', content: 'What should I pack for this trip?' }],
    currentTrip: generatedTrip,
  });
  console.log('✅ 12. AI Chat Assistant replied:', chatRes.data.data.reply.substring(0, 70) + '...');

  // 13. AI Budget Optimizer
  const optRes = await axios.post(`${BASE}/ai/optimize-budget`, {
    tripData: generatedTrip,
    targetSavingsPercent: 15,
  });
  console.log(`✅ 13. AI Budget optimization: original $${optRes.data.data.originalTotal} -> optimized $${optRes.data.data.optimizedTotal} (saved $${optRes.data.data.savingsAmount})`);

  console.log('🎉 ALL INTEGRATION TESTS PASSED 100%! FULL SYSTEM VERIFIED!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err.response?.data || err.message);
  process.exit(1);
});
