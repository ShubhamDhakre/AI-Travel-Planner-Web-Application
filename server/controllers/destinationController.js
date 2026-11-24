import Destination from '../models/Destination.js';

export const getDestinations = async (req, res, next) => {
  try {
    const { category, country, continent, budgetLevel, sort, search } = req.query;
    let destinations = await Destination.find({});

    if (search) {
      const q = search.toLowerCase();
      destinations = destinations.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        (d.attractions && d.attractions.some(a => a.toLowerCase().includes(q)))
      );
    }

    if (country) {
      destinations = destinations.filter(d => d.country.toLowerCase() === country.toLowerCase());
    }

    if (continent) {
      destinations = destinations.filter(d => d.continent.toLowerCase() === continent.toLowerCase());
    }

    if (category) {
      destinations = destinations.filter(d => d.categories && d.categories.some(c => c.toLowerCase() === category.toLowerCase()));
    }

    if (budgetLevel) {
      destinations = destinations.filter(d => d.averageBudget?.level?.toLowerCase() === budgetLevel.toLowerCase());
    }

    if (sort === 'cost-asc') {
      destinations.sort((a, b) => (a.averageBudget?.amount || 0) - (b.averageBudget?.amount || 0));
    } else if (sort === 'cost-desc') {
      destinations.sort((a, b) => (b.averageBudget?.amount || 0) - (a.averageBudget?.amount || 0));
    } else if (sort === 'rating') {
      destinations.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // Default: popularity / rating
      destinations.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }

    res.json({ success: true, count: destinations.length, data: destinations });
  } catch (error) {
    next(error);
  }
};

export const getDestinationById = async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.json({ success: true, data: destination });
  } catch (error) {
    next(error);
  }
};

export const searchDestinations = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({ success: true, data: [] });
    }
    const query = q.toLowerCase();
    const all = await Destination.find({});
    const matches = all.filter(d =>
      d.name.toLowerCase().includes(query) ||
      d.country.toLowerCase().includes(query) ||
      (d.categories && d.categories.some(c => c.toLowerCase().includes(query)))
    );
    res.json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    next(error);
  }
};
