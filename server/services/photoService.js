import axios from 'axios';

const curatedPhotoMap = {
  kyoto: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  tokyo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  swiss: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
  zermatt: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
  santorini: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
  jaipur: 'https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=1200&q=80',
  banff: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  mumbai: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
  london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
  newyork: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
  barcelona: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
  default: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
};

export const getDestinationPhoto = async (destinationName) => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (accessKey) {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(destinationName + ' travel landmark')}&orientation=landscape&per_page=1`,
        { headers: { Authorization: `Client-ID ${accessKey}` } }
      );
      if (response.data?.results?.[0]?.urls?.regular) {
        return {
          url: response.data.results[0].urls.regular,
          source: 'Unsplash Live API',
          photographer: response.data.results[0].user?.name,
        };
      }
    } catch (err) {
      console.warn(`[Unsplash] Error fetching photo for ${destinationName}:`, err.message);
    }
  }

  const clean = destinationName.toLowerCase().replace(/[^a-z]/g, '');
  const matchedKey = Object.keys(curatedPhotoMap).find(k => clean.includes(k));
  const url = matchedKey ? curatedPhotoMap[matchedKey] : curatedPhotoMap.default;

  return {
    url,
    source: 'Curated Travel Photography Catalog',
  };
};
