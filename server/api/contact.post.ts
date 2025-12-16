import { db } from '../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }
    
    // Create contact record
    const contactData = {
      id: Date.now().toString(),
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || '',
      message: body.message.trim(),
      projectId: body.projectId || null,
      projectTitle: body.projectTitle || null,
      type: body.type || 'general_inquiry',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Save to database
    await db.create('contacts', contactData)

    return {
      success: true,
      message: 'Contact form submitted successfully',
      id: contactData.id
    }
  } catch (error) {
    console.error('Contact form submission error:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to submit contact form'
    })
  }
})