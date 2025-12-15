export default defineEventHandler(async (event) => {
  try {
    const facilities = [
      'Swimming Pool',
      'Gym',
      'Playground',
      'Security',
      'Parking',
      'Garden',
      'BBQ Area',
      'Function Room',
      'Tennis Court',
      'Sauna',
      'Jacuzzi',
      'Concierge',
      'Elevator',
      'CCTV',
      'Clubhouse',
      'Jogging Track',
      'Children\'s Pool',
      'Multi-purpose Hall',
      'Reading Room',
      'Yoga Studio',
      'Badminton Court',
      'Basketball Court',
      'Putting Green',
      'Rooftop Garden',
      'Sky Lounge',
      'Business Center',
      'Meeting Room',
      'Karaoke Room',
      'Game Room',
      'Laundry',
    ];

    return {
      facilities: facilities.sort(),
      count: facilities.length,
    };
  } catch (error: any) {
    console.error('Error fetching facilities:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch facilities',
    });
  }
});