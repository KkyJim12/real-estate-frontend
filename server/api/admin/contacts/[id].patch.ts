import { db } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const contactId = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    if (!contactId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Contact ID is required'
      })
    }
    
    // Get existing contact
    const existingContact = await db.getById('contacts', contactId)
    if (!existingContact) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Contact not found'
      })
    }

    // Update contact
    const updatedContact = {
      ...existingContact,
      ...body,
      updatedAt: new Date().toISOString()
    }

    await db.update('contacts', contactId, updatedContact)

    return {
      success: true,
      message: 'Contact updated successfully',
      contact: updatedContact
    }
  } catch (error) {
    console.error('Failed to update contact:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update contact'
    })
  }
})