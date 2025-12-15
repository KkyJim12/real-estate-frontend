<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <label class="block text-sm font-semibold text-gray-700">{{ label }}</label>
      <div class="flex gap-2">
        <button
          type="button"
          @click="activeProvider = 'google'"
          :class="[
            'px-3 py-1 text-sm rounded-lg font-medium transition-colors',
            activeProvider === 'google' 
              ? 'bg-[#ecbc85] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          Google Maps
        </button>
        <button
          type="button"
          @click="activeProvider = 'baidu'"
          :class="[
            'px-3 py-1 text-sm rounded-lg font-medium transition-colors',
            activeProvider === 'baidu' 
              ? 'bg-[#ecbc85] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          Baidu Maps
        </button>
      </div>
    </div>
    
    <!-- Address Search -->
    <div class="flex gap-2">
      <input
        v-model="searchAddress"
        type="text"
        placeholder="Enter address to search..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
        @keyup.enter="geocodeAddress"
      />
      <button
        type="button"
        @click="geocodeAddress"
        :disabled="!searchAddress || geocoding"
        class="px-4 py-2 bg-[#ecbc85] text-white rounded-lg hover:bg-[#d4a574] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Icon v-if="geocoding" name="fa-solid:spinner" class="animate-spin" />
        <Icon v-else name="fa-solid:search" />
      </button>
    </div>
    
    <!-- Coordinates Input -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
        <input
          v-model.number="coordinates.lat"
          type="number"
          step="any"
          placeholder="e.g., 1.3521"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
        <input
          v-model.number="coordinates.lng"
          type="number"
          step="any"
          placeholder="e.g., 103.8198"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
        />
      </div>
    </div>
    
    <!-- Map Preview -->
    <div class="relative">
      <div class="h-64 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
        <div class="h-full flex items-center justify-center">
          <div class="text-center text-gray-500">
            <Icon name="fa-solid:map" class="text-4xl mb-2" />
            <p class="font-medium">{{ activeProvider === 'google' ? 'Google Maps' : 'Baidu Maps' }} Preview</p>
            <p class="text-sm">
              {{ coordinates.lat && coordinates.lng 
                ? `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}` 
                : 'No coordinates set' 
              }}
            </p>
            <p class="text-xs mt-2 text-gray-400">Map integration will be implemented</p>
          </div>
        </div>
      </div>
      
      <!-- Map Controls -->
      <div class="absolute top-2 right-2 flex flex-col gap-1">
        <button
          type="button"
          @click="getCurrentLocation"
          :disabled="gettingLocation"
          class="p-2 bg-white shadow-md rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          title="Get current location"
        >
          <Icon v-if="gettingLocation" name="fa-solid:spinner" class="animate-spin text-[#ecbc85]" />
          <Icon v-else name="fa-solid:location-arrow" class="text-[#ecbc85]" />
        </button>
        <button
          type="button"
          @click="clearLocation"
          class="p-2 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-colors"
          title="Clear location"
        >
          <Icon name="fa-solid:times" class="text-red-500" />
        </button>
      </div>
    </div>
    
    <!-- Location Info -->
    <div v-if="locationInfo" class="p-3 bg-blue-50 rounded-lg border border-blue-200">
      <div class="text-sm text-blue-800">
        <div class="font-medium">{{ locationInfo.formatted_address }}</div>
        <div class="text-xs mt-1">Provider: {{ locationInfo.provider }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: { lat: number | null; lng: number | null };
  label?: string;
}

interface Emits {
  (e: 'update:modelValue', value: { lat: number | null; lng: number | null }): void;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Location',
});

const emit = defineEmits<Emits>();

const coordinates = computed({
  get: () => props.modelValue || { lat: null, lng: null },
  set: (value) => emit('update:modelValue', value),
});

const activeProvider = ref('google');
const searchAddress = ref('');
const geocoding = ref(false);
const gettingLocation = ref(false);
const locationInfo = ref<any>(null);

const geocodeAddress = async () => {
  if (!searchAddress.value) return;
  
  geocoding.value = true;
  try {
    const response = await $fetch('/api/projects/geocode', {
      method: 'POST',
      body: {
        address: searchAddress.value,
        provider: activeProvider.value,
      },
    });
    
    coordinates.value = response.coordinates;
    locationInfo.value = response;
  } catch (error) {
    console.error('Geocoding error:', error);
    alert('Failed to geocode address');
  } finally {
    geocoding.value = false;
  }
};

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by this browser');
    return;
  }
  
  gettingLocation.value = true;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      coordinates.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      locationInfo.value = {
        formatted_address: 'Current Location',
        provider: 'GPS',
      };
      gettingLocation.value = false;
    },
    (error) => {
      console.error('Geolocation error:', error);
      alert('Failed to get current location');
      gettingLocation.value = false;
    }
  );
};

const clearLocation = () => {
  coordinates.value = { lat: null, lng: null };
  locationInfo.value = null;
  searchAddress.value = '';
};
</script>