export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { address, provider = 'google' } = body;

    if (!address) {
      throw createError({
        statusCode: 400,
        message: 'Address is required',
      });
    }

    // Mock geocoding response - in production, integrate with actual APIs
    const mockCoordinates = {
      google: {
        lat: 1.3521 + (Math.random() - 0.5) * 0.1,
        lng: 103.8198 + (Math.random() - 0.5) * 0.1,
      },
      baidu: {
        lat: 1.3521 + (Math.random() - 0.5) * 0.1,
        lng: 103.8198 + (Math.random() - 0.5) * 0.1,
      },
    };

    return {
      address,
      provider,
      coordinates: mockCoordinates[provider as keyof typeof mockCoordinates] || mockCoordinates.google,
      formatted_address: `${address}, Singapore`,
      place_id: `mock_place_id_${Date.now()}`,
    };
  } catch (error: any) {
    console.error('Error geocoding address:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to geocode address',
    });
  }
});