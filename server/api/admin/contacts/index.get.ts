export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const {
      limit = '20',
      offset = '0',
      status = '',
      type = '',
      projectId = '',
    } = query;

    const contacts = await db.getAll('contacts');
    let filteredContacts = [...contacts];

    // Filter by status
    if (status) {
      filteredContacts = filteredContacts.filter((contact: any) =>
        contact.status === status
      );
    }

    // Filter by type
    if (type) {
      filteredContacts = filteredContacts.filter((contact: any) =>
        contact.type === type
      );
    }

    // Filter by project
    if (projectId) {
      filteredContacts = filteredContacts.filter((contact: any) =>
        contact.projectId === projectId
      );
    }

    // Sort by creation date (newest first)
    filteredContacts.sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Pagination
    const limitNum = parseInt(limit.toString()) || 20;
    const offsetNum = parseInt(offset.toString()) || 0;
    const paginatedContacts = filteredContacts.slice(offsetNum, offsetNum + limitNum);

    return {
      contacts: paginatedContacts,
      total: filteredContacts.length,
      limit: limitNum,
      offset: offsetNum,
      hasMore: offsetNum + limitNum < filteredContacts.length,
      stats: {
        total: contacts.length,
        new: contacts.filter((c: any) => c.status === 'new').length,
        contacted: contacts.filter((c: any) => c.status === 'contacted').length,
        closed: contacts.filter((c: any) => c.status === 'closed').length,
      },
    };
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch contacts',
    });
  }
});