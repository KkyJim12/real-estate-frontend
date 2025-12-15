export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!body[field]) {
        throw createError({
          statusCode: 400,
          message: `${field} is required`,
        });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email format',
      });
    }

    const contactSubmission = {
      id: Date.now().toString(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      message: body.message || '',
      projectId: body.projectId || null,
      projectTitle: body.projectTitle || null,
      type: body.type || 'general_inquiry',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to database
    await db.create('contacts', contactSubmission);

    // In a real application, you might want to:
    // 1. Send email notification to admin
    // 2. Send confirmation email to user
    // 3. Integrate with CRM system
    // 4. Send to marketing automation platform

    return {
      success: true,
      message: 'Contact form submitted successfully',
      id: contactSubmission.id,
    };
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to submit contact form',
    });
  }
});