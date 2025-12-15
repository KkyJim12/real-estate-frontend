<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <label class="block text-sm font-semibold text-gray-700">{{ label }}</label>
      <div class="text-sm text-gray-500">
        {{ selectedFacilities.length }} selected
      </div>
    </div>
    
    <!-- Search -->
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search facilities..."
        class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
      />
      <Icon name="fa-solid:search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
    
    <!-- Quick Actions -->
    <div class="flex gap-2">
      <button
        type="button"
        @click="selectAll"
        class="px-3 py-1 text-sm bg-[#ecbc85] text-white rounded-lg hover:bg-[#d4a574] transition-colors"
      >
        Select All
      </button>
      <button
        type="button"
        @click="clearAll"
        class="px-3 py-1 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        Clear All
      </button>
    </div>
    
    <!-- Facilities Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
      <label 
        v-for="facility in filteredFacilities" 
        :key="facility" 
        class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <input
          v-model="selectedFacilities"
          :value="facility"
          type="checkbox"
          class="rounded border-gray-300 text-[#ecbc85] focus:ring-[#ecbc85]"
        />
        <span class="text-sm text-gray-700 select-none">{{ facility }}</span>
      </label>
    </div>
    
    <!-- Selected Facilities Tags -->
    <div v-if="selectedFacilities.length > 0" class="space-y-2">
      <div class="text-sm font-medium text-gray-700">Selected Facilities:</div>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="facility in selectedFacilities"
          :key="facility"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#ecbc85]/10 text-[#ecbc85] border border-[#ecbc85]/20"
        >
          {{ facility }}
          <button
            type="button"
            @click="removeFacility(facility)"
            class="ml-2 text-[#ecbc85] hover:text-[#d4a574]"
          >
            ×
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string[];
  label?: string;
  facilities?: string[];
}

interface Emits {
  (e: 'update:modelValue', value: string[]): void;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Facilities',
  facilities: () => [
    'Swimming Pool', 'Gym', 'Playground', 'Security', 'Parking',
    'Garden', 'BBQ Area', 'Function Room', 'Tennis Court', 'Sauna',
    'Jacuzzi', 'Concierge', 'Elevator', 'CCTV', 'Clubhouse',
    'Jogging Track', 'Children\'s Pool', 'Multi-purpose Hall',
    'Reading Room', 'Yoga Studio', 'Badminton Court', 'Basketball Court',
    'Putting Green', 'Rooftop Garden', 'Sky Lounge', 'Business Center',
    'Meeting Room', 'Karaoke Room', 'Game Room', 'Laundry'
  ],
});

const emit = defineEmits<Emits>();

const selectedFacilities = computed({
  get: () => props.modelValue || [],
  set: (value) => emit('update:modelValue', value),
});

const searchQuery = ref('');

const filteredFacilities = computed(() => {
  if (!searchQuery.value) return props.facilities;
  
  return props.facilities.filter(facility =>
    facility.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectAll = () => {
  selectedFacilities.value = [...props.facilities];
};

const clearAll = () => {
  selectedFacilities.value = [];
};

const removeFacility = (facility: string) => {
  selectedFacilities.value = selectedFacilities.value.filter(f => f !== facility);
};
</script>