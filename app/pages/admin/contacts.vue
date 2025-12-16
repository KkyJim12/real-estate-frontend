<template>
  <div class="min-h-screen bg-gray-50">
    <AdminLayout>
      <div class="p-6 space-y-8">
        <!-- Header -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ $t('admin.contacts.title') }}</h1>
              <p class="text-gray-600 mt-1">{{ $t('admin.contacts.subtitle') }}</p>
            </div>
            <div class="flex items-center space-x-4">
              <!-- Stats -->
              <div class="flex items-center space-x-6 text-sm">
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-600">{{ stats.new || 0 }}</div>
                  <div class="text-gray-500">{{ $t('admin.contacts.newContacts') }}</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-yellow-600">{{ stats.contacted || 0 }}</div>
                  <div class="text-gray-500">{{ $t('admin.contacts.respondedContacts') }}</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">{{ stats.closed || 0 }}</div>
                  <div class="text-gray-500">{{ $t('admin.contacts.pendingContacts') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Search -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('common.search') }}</label>
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search contacts..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                @input="debouncedSearch"
              />
            </div>

            <!-- Status Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="filters.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                @change="loadContacts"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <!-- Type Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                v-model="filters.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                @change="loadContacts"
              >
                <option value="">All Types</option>
                <option value="project_inquiry">Project Inquiry</option>
                <option value="general_inquiry">General Inquiry</option>
              </select>
            </div>

            <!-- Refresh Button -->
            <div class="flex items-end">
              <button
                @click="loadContacts"
                class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Icon name="fa-solid:refresh" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6">
          <div class="flex items-center space-x-3">
            <Icon name="fa-solid:exclamation-triangle" class="text-red-500 text-xl" />
            <div>
              <h3 class="text-red-800 font-medium">Error Loading Contacts</h3>
              <p class="text-red-600 text-sm mt-1">{{ error }}</p>
              <button 
                @click="loadContacts" 
                class="mt-2 text-red-700 hover:text-red-900 text-sm font-medium underline"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>

        <!-- Contacts Table -->
        <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <!-- Loading State -->
          <div v-if="loading" class="p-8 text-center">
            <div class="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-gray-600">Loading contacts...</p>
          </div>

          <!-- Contacts List -->
          <div v-else-if="contacts && contacts.length > 0">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="contact in contacts" :key="contact.id" class="hover:bg-gray-50 transition-colors">
                    <!-- Contact Info -->
                    <td class="px-6 py-4">
                      <div>
                        <div class="text-sm font-medium text-gray-900">
                          {{ contact.firstName || 'N/A' }} {{ contact.lastName || '' }}
                        </div>
                        <div class="text-sm text-gray-500">{{ contact.email || 'No email' }}</div>
                        <div v-if="contact.phone" class="text-sm text-gray-500">{{ contact.phone }}</div>
                      </div>
                    </td>

                    <!-- Project -->
                    <td class="px-6 py-4">
                      <div v-if="contact.projectTitle" class="text-sm text-gray-900">
                        {{ contact.projectTitle }}
                      </div>
                      <div v-else class="text-sm text-gray-500">-</div>
                    </td>

                    <!-- Type -->
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                        :class="{
                          'bg-blue-100 text-blue-800': contact.type === 'project_inquiry',
                          'bg-gray-100 text-gray-800': contact.type === 'general_inquiry'
                        }">
                        {{ contact.type ? contact.type.replace('_', ' ') : 'Unknown' }}
                      </span>
                    </td>

                    <!-- Status -->
                    <td class="px-6 py-4">
                      <select
                        :value="contact.status"
                        @change="updateContactStatus(contact.id, ($event.target as HTMLSelectElement).value)"
                        class="text-sm border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md capitalize px-2 py-1"
                        :class="{
                          'text-red-600': contact.status === 'new',
                          'text-yellow-600': contact.status === 'contacted',
                          'text-green-600': contact.status === 'closed'
                        }"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>

                    <!-- Date -->
                    <td class="px-6 py-4 text-sm text-gray-500">
                      {{ contact.createdAt ? formatDate(contact.createdAt) : 'Unknown' }}
                    </td>

                    <!-- Actions -->
                    <td class="px-6 py-4">
                      <button
                        @click="viewContact(contact)"
                        class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 text-sm font-medium rounded-md transition-colors"
                      >
                        <Icon name="fa-solid:eye" class="mr-1 text-xs" />
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="pagination.totalPages > 1" class="px-6 py-4 border-t border-gray-200">
              <div class="flex items-center justify-between">
                <div class="text-sm text-gray-700">
                  Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to 
                  {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of 
                  {{ pagination.total }} results
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    @click="changePage(pagination.page - 1)"
                    :disabled="!pagination.hasPrev"
                    class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span class="px-3 py-1 text-sm">
                    Page {{ pagination.page }} of {{ pagination.totalPages }}
                  </span>
                  <button
                    @click="changePage(pagination.page + 1)"
                    :disabled="!pagination.hasNext"
                    class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="p-8 text-center">
            <Icon name="fa-solid:inbox" class="text-4xl text-gray-400 mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p class="text-gray-600">No contact inquiries match your current filters.</p>
          </div>
        </div>
      </div>

    </AdminLayout>

    <!-- Contact Detail Modal -->
    <Teleport to="body">
      <div v-if="selectedContact" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50">
        <!-- Modal Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50" @click="closeModal"></div>
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-bold">Contact Details</h3>
                <p class="text-blue-100 text-sm">ID: {{ selectedContact.id }}</p>
              </div>
              <button 
                @click="closeModal" 
                class="text-white hover:text-blue-200 transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <Icon name="fa-solid:times" class="text-xl" />
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <!-- Contact Info -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="fa-solid:user" class="mr-2 text-blue-600" />
                Contact Information
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div class="text-sm text-gray-900 bg-white px-3 py-2 rounded border">
                    {{ selectedContact.firstName || 'N/A' }} {{ selectedContact.lastName || '' }}
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div class="text-sm text-gray-900 bg-white px-3 py-2 rounded border">
                    {{ selectedContact.email || 'No email provided' }}
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div class="text-sm text-gray-900 bg-white px-3 py-2 rounded border">
                    {{ selectedContact.phone || 'No phone provided' }}
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize"
                    :class="{
                      'bg-red-100 text-red-800': selectedContact.status === 'new',
                      'bg-yellow-100 text-yellow-800': selectedContact.status === 'contacted',
                      'bg-green-100 text-green-800': selectedContact.status === 'closed'
                    }">
                    {{ selectedContact.status || 'Unknown' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Project Info -->
            <div v-if="selectedContact.projectTitle || selectedContact.projectId" class="bg-blue-50 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="fa-solid:building" class="mr-2 text-blue-600" />
                Project Information
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                  <div class="text-sm text-gray-900 bg-white px-3 py-2 rounded border">
                    {{ selectedContact.projectTitle || 'No project specified' }}
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Project ID</label>
                  <div class="text-sm text-gray-900 bg-white px-3 py-2 rounded border">
                    {{ selectedContact.projectId || 'N/A' }}
                  </div>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Inquiry Type</label>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize"
                    :class="{
                      'bg-blue-100 text-blue-800': selectedContact.type === 'project_inquiry',
                      'bg-gray-100 text-gray-800': selectedContact.type === 'general_inquiry'
                    }">
                    {{ selectedContact.type ? selectedContact.type.replace('_', ' ') : 'Unknown' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Message -->
            <div class="bg-green-50 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="fa-solid:message" class="mr-2 text-green-600" />
                Customer Message
              </h4>
              <div class="bg-white border rounded-lg p-4">
                <p class="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                  {{ selectedContact.message || 'No message provided' }}
                </p>
              </div>
            </div>

            <!-- Timestamps -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="fa-solid:clock" class="mr-2 text-gray-600" />
                Timeline
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Created</label>
                  <div class="text-sm text-gray-900 bg-white px-3 py-2 rounded border">
                    {{ selectedContact.createdAt ? formatDate(selectedContact.createdAt) : 'Unknown' }}
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                  <div class="text-sm text-gray-900 bg-white px-3 py-2 rounded border">
                    {{ selectedContact.updatedAt ? formatDate(selectedContact.updatedAt) : 'Not updated' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-end gap-3 border-t">
            <button
              @click="closeModal"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
            <button
              v-if="selectedContact.email"
              @click="replyToContact"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Icon name="fa-solid:reply" />
              <span>Reply via Email</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const contacts = ref<any[]>([])
const loading = ref(true)
const error = ref<string>('')
const selectedContact = ref<any>(null)

const filters = ref({
  search: '',
  status: '',
  type: ''
})

const pagination = ref({
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
  hasNext: false,
  hasPrev: false
})

const stats = ref({
  total: 0,
  new: 0,
  contacted: 0,
  closed: 0
})

// Load contacts
const loadContacts = async () => {
  loading.value = true
  error.value = ''
  try {
    const query = new URLSearchParams({
      page: pagination.value.page.toString(),
      limit: pagination.value.limit.toString(),
      ...(filters.value.search && { search: filters.value.search }),
      ...(filters.value.status && { status: filters.value.status }),
      ...(filters.value.type && { type: filters.value.type })
    })

    const data: any = await $fetch(`/api/admin/contacts?${query}`)
    
    // Ensure data structure is correct
    contacts.value = Array.isArray(data.contacts) ? data.contacts : []
    pagination.value = data.pagination || {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false
    }
    stats.value = data.stats || {
      total: 0,
      new: 0,
      contacted: 0,
      closed: 0
    }
  } catch (err: any) {
    console.error('Failed to load contacts:', err)
    error.value = err?.data?.message || err?.message || 'Failed to load contacts. Please try again.'
    contacts.value = []
  } finally {
    loading.value = false
  }
}

// Debounced search
let searchTimeout: NodeJS.Timeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    loadContacts()
  }, 500)
}

// Update contact status
const updateContactStatus = async (contactId: string, status: string) => {
  try {
    await $fetch(`/api/admin/contacts/${contactId}`, {
      method: 'PATCH',
      body: { status }
    })
    
    // Update local state
    const contact = contacts.value.find(c => c.id === contactId)
    if (contact) {
      contact.status = status
    }
    
    // Reload to update stats
    loadContacts()
  } catch (error) {
    console.error('Failed to update contact status:', error)
    alert('Failed to update contact status')
  }
}

// View contact details
const viewContact = (contact: any) => {
  selectedContact.value = { ...contact } // Create a copy to avoid reactivity issues
  document.body.style.overflow = 'hidden' // Prevent body scroll when modal is open
}

// Close modal
const closeModal = () => {
  selectedContact.value = null
  document.body.style.overflow = 'auto' // Re-enable body scroll
}

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && selectedContact.value) {
    closeModal()
  }
}

// Reply to contact via email
const replyToContact = () => {
  if (selectedContact.value?.email) {
    const subject = encodeURIComponent(`Re: Your inquiry about ${selectedContact.value.projectTitle || 'our project'}`)
    const body = encodeURIComponent(`Dear ${selectedContact.value.firstName || 'Customer'},\n\nThank you for your inquiry. We would be happy to assist you.\n\nBest regards,\nThe Team`)
    window.open(`mailto:${selectedContact.value.email}?subject=${subject}&body=${body}`)
  }
}

// Change page
const changePage = (page: number) => {
  pagination.value.page = page
  loadContacts()
}

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Initialize
onMounted(() => {
  loadContacts()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto' // Ensure body scroll is restored
})
</script>

<style scoped>
/* Ensure proper table layout */
table {
  table-layout: fixed;
}

/* Responsive table columns */
th:nth-child(1), td:nth-child(1) { width: 25%; } /* Contact */
th:nth-child(2), td:nth-child(2) { width: 20%; } /* Project */
th:nth-child(3), td:nth-child(3) { width: 15%; } /* Type */
th:nth-child(4), td:nth-child(4) { width: 15%; } /* Status */
th:nth-child(5), td:nth-child(5) { width: 15%; } /* Date */
th:nth-child(6), td:nth-child(6) { width: 10%; } /* Actions */

/* Smooth transitions */
.transition-colors {
  transition: color 0.2s ease, background-color 0.2s ease;
}

/* Loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  th:nth-child(2), td:nth-child(2),
  th:nth-child(3), td:nth-child(3),
  th:nth-child(5), td:nth-child(5) {
    display: none;
  }
  
  th:nth-child(1), td:nth-child(1) { width: 50%; }
  th:nth-child(4), td:nth-child(4) { width: 30%; }
  th:nth-child(6), td:nth-child(6) { width: 20%; }
}
</style>

<style>
/* Global modal styles (not scoped to avoid conflicts) */
.modal-backdrop {
  backdrop-filter: blur(4px);
}

/* Ensure modal appears above everything */
.modal-container {
  z-index: 9999 !important;
}

/* Prevent body scroll when modal is open */
body.modal-open {
  overflow: hidden !important;
}

/* Modal animation */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-to, .modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>