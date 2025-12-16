import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    
    // Get all contacts
    const contacts = await db.getAll('contacts')
    
    // Sort by creation date (newest first)
    const sortedContacts = contacts.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Apply filters if provided
    let filteredContacts = sortedContacts

    if (query.status) {
      filteredContacts = filteredContacts.filter((contact: any) => 
        contact.status === query.status
      )
    }

    if (query.type) {
      filteredContacts = filteredContacts.filter((contact: any) => 
        contact.type === query.type
      )
    }

    if (query.search) {
      const searchTerm = query.search.toString().toLowerCase()
      filteredContacts = filteredContacts.filter((contact: any) => 
        contact.firstName.toLowerCase().includes(searchTerm) ||
        contact.lastName.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm) ||
        contact.message.toLowerCase().includes(searchTerm) ||
        (contact.projectTitle && contact.projectTitle.toLowerCase().includes(searchTerm))
      )
    }

    // Pagination
    const page = parseInt(query.page?.toString() || '1')
    const limit = parseInt(query.limit?.toString() || '20')
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedContacts = filteredContacts.slice(startIndex, endIndex)

    return {
      contacts: paginatedContacts,
      pagination: {
        page,
        limit,
        total: filteredContacts.length,
        totalPages: Math.ceil(filteredContacts.length / limit),
        hasNext: endIndex < filteredContacts.length,
        hasPrev: page > 1
      },
      stats: {
        total: contacts.length,
        new: contacts.filter((c: any) => c.status === 'new').length,
        contacted: contacts.filter((c: any) => c.status === 'contacted').length,
        closed: contacts.filter((c: any) => c.status === 'closed').length
      }
    }
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch contacts'
    })
  }
})