export default defineEventHandler(async (event) => {
  try {
    const projectTypes = [
      { value: 'residential', label: 'Residential' },
      { value: 'commercial', label: 'Commercial' },
      { value: 'mixed', label: 'Mixed Use' },
      { value: 'industrial', label: 'Industrial' },
      { value: 'retail', label: 'Retail' },
      { value: 'office', label: 'Office' },
      { value: 'hospitality', label: 'Hospitality' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'education', label: 'Education' },
      { value: 'warehouse', label: 'Warehouse' },
    ];

    const ownershipTypes = [
      { value: 'freehold', label: 'Freehold' },
      { value: 'leasehold', label: 'Leasehold' },
      { value: 'strata', label: 'Strata' },
      { value: 'rental', label: 'Rental' },
      { value: 'cooperative', label: 'Cooperative' },
    ];

    const roomTypes = [
      { value: 'studio', label: 'Studio' },
      { value: '1br', label: '1 Bedroom' },
      { value: '2br', label: '2 Bedroom' },
      { value: '3br', label: '3 Bedroom' },
      { value: '4br', label: '4 Bedroom' },
      { value: '5br', label: '5+ Bedroom' },
      { value: 'penthouse', label: 'Penthouse' },
      { value: 'duplex', label: 'Duplex' },
      { value: 'loft', label: 'Loft' },
      { value: 'townhouse', label: 'Townhouse' },
    ];

    return {
      projectTypes,
      ownershipTypes,
      roomTypes,
    };
  } catch (error: any) {
    console.error('Error fetching project types:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch project types',
    });
  }
});