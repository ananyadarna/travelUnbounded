// Static destination dataset for India and International tour packages

export const indiaDestinations = [
  {
    id: 'kerala',
    name: 'Kerala',
    country: 'India',
    category: 'india',
    price: 25000,
    formattedPrice: '₹25,000',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    description: 'Explore emerald backwaters, misty tea gardens in Munnar, and peaceful houseboat cruises in God\'s Own Country.',
    highlights: ['Alleppey Houseboat Cruise', 'Munnar Tea Plantations', 'Thekkady Spice Trails']
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    country: 'India',
    category: 'india',
    price: 22000,
    formattedPrice: '₹22,000',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    description: 'Experience snow-capped Himalayan peaks, pine valleys in Manali, and serene monasteries in Dharamshala.',
    highlights: ['Solang Valley Snow Sports', 'Old Manali Cafes', 'Dharamshala Monasteries']
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    country: 'India',
    category: 'india',
    price: 35000,
    formattedPrice: '₹35,000',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    description: 'Journey across high-altitude mountain passes, crystal-blue Pangong Lake, and ancient Buddhist gompas.',
    highlights: ['Pangong Tso Lake', 'Nubra Valley Sand Dunes', 'Khardung La Pass']
  },
  {
    id: 'andaman',
    name: 'Andaman & Nicobar',
    country: 'India',
    category: 'india',
    price: 32000,
    formattedPrice: '₹32,000',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80',
    description: 'Pristine turquoise waters, coral reefs, coral beach diving at Havelock, and tropical forest trails.',
    highlights: ['Radhanagar Beach', 'Scuba Diving at Havelock', 'Cellular Jail Light Show']
  },
  {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    category: 'india',
    price: 18000,
    formattedPrice: '₹18,000',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    description: 'Golden sun-kissed beaches, Portuguese heritage architecture, water sports, and vibrant coastal dining.',
    highlights: ['Baga & Palolem Beaches', 'Dudhsagar Waterfalls', 'Fontainhas Latin Quarter']
  }
];

export const internationalDestinations = [
  {
    id: 'kenya',
    name: 'Kenya',
    country: 'Kenya',
    category: 'international',
    price: 110000,
    formattedPrice: '₹1,10,000',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    description: 'Witness the Great Wildebeest Migration in Masai Mara and iconic wildlife savannas under African skies.',
    highlights: ['Masai Mara Game Drives', 'Lake Nakuru Flamingos', 'Amboseli Kilimanjaro Views']
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    country: 'Vietnam',
    category: 'international',
    price: 55000,
    formattedPrice: '₹55,000',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    description: 'Cruise emerald waters among Ha Long Bay limestone karsts, lantern-lit Hoi An streets, and rich street food culture.',
    highlights: ['Ha Long Bay Overnight Cruise', 'Hoi An Ancient Town', 'Mekong Delta Tour']
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    country: 'Tanzania',
    category: 'international',
    price: 125000,
    formattedPrice: '₹1,25,000',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
    description: 'Explore the vast Serengeti plains, Ngorongoro Crater wildlife, and idyllic white sand beaches of Zanzibar.',
    highlights: ['Serengeti Safari', 'Ngorongoro Crater Tour', 'Zanzibar Spice Beaches']
  },
  {
    id: 'iceland',
    name: 'Iceland',
    country: 'Iceland',
    category: 'international',
    price: 145000,
    formattedPrice: '₹1,45,000',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
    description: 'Chasing the magical Northern Lights, roaring waterfalls, black sand beaches, and geothermal Blue Lagoon spas.',
    highlights: ['Golden Circle Waterfalls', 'Aurora Borealis Tours', 'Blue Lagoon Geothermal Spa']
  },
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    country: 'Sri Lanka',
    category: 'international',
    price: 42000,
    formattedPrice: '₹42,000',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
    description: 'Ancient Sigiriya rock fortress, scenic Kandy to Ella train journeys, wild elephants, and golden beaches.',
    highlights: ['Sigiriya Rock Fortress', 'Scenic Ella Scenic Train', 'Mirissa Whale Watching']
  }
];

export const allDestinations = [...indiaDestinations, ...internationalDestinations];
