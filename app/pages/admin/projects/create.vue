<template>
  <AdminLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div class="mb-6">
        <button
          @click="navigateTo('/admin/projects')"
          class="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          <Icon name="fa-solid:arrow-left" class="mr-2" />
          Back to Projects
        </button>
      </div>

      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
          Create New Project
        </h1>
        <p class="text-sm sm:text-base text-gray-600">
          Fill in the details to create a new real estate project
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Project Info Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Icon name="fa-solid:info-circle" class="mr-2 text-[#ecbc85]" />
            Project Information
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="lg:col-span-2">
              <MultiLanguageInput
                v-model="form.title"
                label="Project Title"
                placeholder="e.g., RAMADA EMERALD BAY"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Developer *</label
              >
              <input
                v-model="form.developer"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                placeholder="Developer name"
              />
            </div>

            <div class="lg:col-span-2">
              <MultiLanguageEditor
                v-model="form.description"
                label="Description"
                placeholder="Enter project description..."
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Project Location *</label
              >
              <input
                v-model="form.location"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                placeholder="Project address"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Project Area</label
              >
              <input
                v-model="form.area"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                placeholder="e.g., 50,000 sqm"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Project Type *</label
              >
              <select
                v-model="form.projectType"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
              >
                <option value="">Select project type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="mixed">Mixed Use</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Ownership Type</label
              >
              <select
                v-model="form.ownershipType"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
              >
                <option value="">Select ownership type</option>
                <option value="freehold">Freehold</option>
                <option value="leasehold">Leasehold</option>
                <option value="strata">Strata</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Construction Period</label
              >
              <input
                v-model="form.constructionPeriod"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                placeholder="e.g., 2023-2025"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Expected Finish Period</label
              >
              <input
                v-model="form.expectedFinish"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                placeholder="e.g., Q4 2025"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Number of Floors</label
              >
              <input
                v-model.number="form.floors"
                type="number"
                min="1"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                placeholder="Number of floors"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Number of Units/Buildings</label
              >
              <input
                v-model.number="form.units"
                type="number"
                min="1"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                placeholder="Total units or buildings"
              />
            </div>

            <!-- Facilities Multi-Select -->
            <div class="lg:col-span-2">
              <FacilitiesSelector
                v-model="form.facilities"
                label="Facilities"
                :facilities="availableFacilities"
              />
            </div>

            <!-- Neighborhoods -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Neighborhoods</label
              >
              <div class="space-y-3">
                <div
                  v-for="(neighborhood, index) in form.neighborhoods"
                  :key="index"
                  class="border border-gray-200 rounded-lg p-4"
                >
                  <div class="flex justify-between items-center mb-3">
                    <h4 class="font-medium text-gray-700">
                      Neighborhood {{ index + 1 }}
                    </h4>
                    <button
                      type="button"
                      @click="removeNeighborhood(index)"
                      class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Icon name="fa-solid:trash" />
                    </button>
                  </div>
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Number/Code</label
                      >
                      <input
                        v-model="neighborhood.number"
                        type="text"
                        placeholder="Number/Code"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div class="lg:col-span-2">
                      <MultiLanguageInput
                        v-model="neighborhood.name"
                        label="Neighborhood Name"
                        placeholder="Neighborhood name"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  @click="addNeighborhood"
                  class="flex items-center px-4 py-2 text-[#ecbc85] hover:bg-[#ecbc85]/10 rounded-lg transition-colors"
                >
                  <Icon name="fa-solid:plus" class="mr-2" />
                  Add Neighborhood
                </button>
              </div>
            </div>

            <!-- Main Project Image -->
            <div class="lg:col-span-2">
              <ImageUpload
                v-model="form.image"
                label="Main Project Image *"
                placeholder="Upload the main project image that will be displayed on the homepage"
              />
              <p class="text-sm text-gray-500 mt-1">
                This image will be displayed on the homepage projects section.
                Recommended: 800x600px or higher
              </p>
            </div>

            <!-- Brochure Upload -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Project Brochure</label
              >
              <input
                type="file"
                @change="handleBrochureUpload"
                accept=".pdf,.doc,.docx"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
              />
              <p class="text-sm text-gray-500 mt-1">
                Upload PDF, DOC, or DOCX files
              </p>
            </div>
          </div>
        </div>

        <!-- Hero Carousel Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Icon name="fa-solid:images" class="mr-2 text-[#ecbc85]" />
            Hero Carousel Images
          </h2>

          <div class="space-y-6">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start space-x-3">
                <Icon
                  name="fa-solid:info-circle"
                  class="text-blue-500 mt-0.5"
                />
                <div>
                  <h3 class="font-medium text-blue-800">Hero Carousel</h3>
                  <p class="text-sm text-blue-600 mt-1">
                    These images will be displayed in the main hero carousel on
                    the homepage. Add multiple high-quality images to showcase
                    your project. The first image will be the primary hero
                    image.
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div
                v-for="(carouselItem, index) in form.heroCarousel"
                :key="index"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex justify-between items-center mb-4">
                  <h3 class="font-semibold text-gray-800">
                    Carousel Item {{ index + 1 }}
                  </h3>
                  <div class="flex items-center space-x-2">
                    <span
                      v-if="index === 0"
                      class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      Primary
                    </span>
                    <button
                      type="button"
                      @click="removeCarouselItem(index)"
                      class="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <Icon name="fa-solid:trash" />
                    </button>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <!-- Image Upload -->
                  <div>
                    <ImageUpload
                      v-model="carouselItem.image"
                      label="Hero Image *"
                      placeholder="Upload carousel image"
                    />
                    <p class="text-sm text-gray-500 mt-1">
                      Recommended: 1920x1080px or higher
                    </p>
                  </div>

                  <!-- Carousel Details -->
                  <div class="space-y-4">
                    <div>
                      <MultiLanguageInput
                        v-model="carouselItem.title"
                        label="Title"
                        placeholder="Carousel slide title"
                      />
                    </div>

                    <div>
                      <MultiLanguageEditor
                        v-model="carouselItem.description"
                        label="Description"
                        placeholder="Brief description for this slide"
                        :rows="3"
                      />
                    </div>

                    <div>
                      <MultiLanguageInput
                        v-model="carouselItem.buttonText"
                        label="Button Text"
                        placeholder="e.g., View Project, Learn More"
                      />
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Button Link</label
                      >
                      <input
                        v-model="carouselItem.buttonLink"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                        placeholder="e.g., /projects/project-name"
                      />
                    </div>

                    <div class="flex items-center">
                      <input
                        v-model="carouselItem.active"
                        type="checkbox"
                        class="rounded border-gray-300 text-[#ecbc85] focus:ring-[#ecbc85] mr-2"
                      />
                      <label class="text-sm text-gray-700"
                        >Active (show in carousel)</label
                      >
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                @click="addCarouselItem"
                class="flex items-center px-4 py-2 text-[#ecbc85] hover:bg-[#ecbc85]/10 rounded-lg transition-colors"
              >
                <Icon name="fa-solid:plus" class="mr-2" />
                Add Carousel Item
              </button>
            </div>
          </div>
        </div>

        <!-- Show Units Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Icon name="fa-solid:home" class="mr-2 text-[#ecbc85]" />
            Show Units
          </h2>

          <div class="space-y-6">
            <div
              v-for="(unit, index) in form.showUnits"
              :key="index"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold text-gray-800">
                  Unit {{ index + 1 }}
                </h3>
                <button
                  type="button"
                  @click="removeShowUnit(index)"
                  class="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <Icon name="fa-solid:trash" />
                </button>
              </div>

              <div class="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <MultiLanguageInput
                    v-model="unit.roomType"
                    label="Room Type"
                    placeholder="e.g., Studio, 1 Bedroom, 2 Bedroom, Penthouse"
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    Enter any room type (e.g., Studio, 1BR, 2BR, 3BR, Penthouse,
                    Duplex, etc.)
                  </p>
                </div>

                <div>
                  <MultiLanguageEditor
                    v-model="unit.description"
                    label="Description"
                    placeholder="Unit description..."
                    :rows="3"
                  />
                </div>
              </div>

              <div>
                <MultiImageUpload
                  v-model="unit.images"
                  label="Unit Images"
                  description="Upload multiple images for this unit"
                  :max-files="8"
                />
              </div>
            </div>

            <button
              type="button"
              @click="addShowUnit"
              class="flex items-center px-4 py-2 text-[#ecbc85] hover:bg-[#ecbc85]/10 rounded-lg transition-colors"
            >
              <Icon name="fa-solid:plus" class="mr-2" />
              Add Show Unit
            </button>
          </div>
        </div>

        <!-- Gallery Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Icon name="fa-solid:images" class="mr-2 text-[#ecbc85]" />
            Project Gallery
          </h2>

          <div class="space-y-4">
            <div
              v-for="(galleryItem, index) in form.gallery"
              :key="index"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="flex justify-between items-center mb-3">
                <h3 class="font-semibold text-gray-800">
                  Gallery Item {{ index + 1 }}
                </h3>
                <button
                  type="button"
                  @click="removeGalleryItem(index)"
                  class="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <Icon name="fa-solid:trash" />
                </button>
              </div>

              <div class="space-y-4">
                <div>
                  <MultiLanguageInput
                    v-model="galleryItem.tag"
                    label="Tag"
                    placeholder="e.g., Exterior, Interior, Amenities"
                  />
                </div>

                <MultiImageUpload
                  v-model="galleryItem.images"
                  :label="`Images for ${galleryItem.tag?.en || 'Gallery Item'}`"
                  description="Upload multiple images for this gallery section"
                  :max-files="12"
                />
              </div>
            </div>

            <button
              type="button"
              @click="addGalleryItem"
              class="flex items-center px-4 py-2 text-[#ecbc85] hover:bg-[#ecbc85]/10 rounded-lg transition-colors"
            >
              <Icon name="fa-solid:plus" class="mr-2" />
              Add Gallery Item
            </button>
          </div>
        </div>

        <!-- Location Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Icon name="fa-solid:map-marker-alt" class="mr-2 text-[#ecbc85]" />
            Location
          </h2>

          <MapSelector
            v-model="form.coordinates"
            label="Project Location on Map"
          />
        </div>

        <!-- Settings Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Icon name="fa-solid:cog" class="mr-2 text-[#ecbc85]" />
            Settings
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Display Order</label
              >
              <input
                v-model.number="form.order"
                type="number"
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                placeholder="0"
              />
              <p class="text-sm text-gray-500 mt-2">
                Lower numbers appear first
              </p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Status</label
              >
              <div class="flex items-center h-12">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="form.active"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ecbc85]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ecbc85]"
                  ></div>
                  <span class="ml-3 text-sm font-medium text-gray-700">
                    {{
                      form.active
                        ? "Active (visible on website)"
                        : "Inactive (hidden)"
                    }}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="flex flex-col sm:flex-row justify-end gap-3 pt-6">
          <button
            type="button"
            @click="navigateTo('/admin/projects')"
            class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="saving"
            class="px-6 py-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Icon v-if="saving" name="fa-solid:spinner" class="animate-spin" />
            <span>{{ saving ? "Creating..." : "Create Project" }}</span>
          </button>
        </div>
      </form>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const form = ref({
  title: { en: "", th: "", zh: "" },
  description: { en: "", th: "", zh: "" },
  developer: "",
  location: "",
  area: "",
  projectType: "",
  ownershipType: "",
  constructionPeriod: "",
  expectedFinish: "",
  floors: null,
  units: null,
  image: "", // Main project image for homepage
  facilities: [],
  neighborhoods: [{ number: "", name: { en: "", th: "", zh: "" } }],
  brochure: null,
  heroCarousel: [],
  showUnits: [],
  gallery: [],
  coordinates: {
    lat: null,
    lng: null,
  },
  order: 0,
  active: true,
});

const saving = ref(false);

const availableFacilities = [
  "Swimming Pool",
  "Gym",
  "Playground",
  "Security",
  "Parking",
  "Garden",
  "BBQ Area",
  "Function Room",
  "Tennis Court",
  "Sauna",
  "Jacuzzi",
  "Concierge",
  "Elevator",
  "CCTV",
  "Clubhouse",
  "Jogging Track",
  "Children's Pool",
  "Multi-purpose Hall",
  "Reading Room",
  "Yoga Studio",
  "Badminton Court",
  "Basketball Court",
  "Putting Green",
  "Rooftop Garden",
  "Sky Lounge",
  "Business Center",
  "Meeting Room",
  "Karaoke Room",
  "Game Room",
  "Laundry",
];

// Neighborhood functions
const addNeighborhood = () => {
  form.value.neighborhoods.push({
    number: "",
    name: { en: "", th: "", zh: "" },
  });
};

const removeNeighborhood = (index: number) => {
  if (form.value.neighborhoods.length > 1) {
    form.value.neighborhoods.splice(index, 1);
  }
};

// Show Unit functions
const addShowUnit = () => {
  form.value.showUnits.push({
    roomType: { en: "", th: "", zh: "" },
    description: { en: "", th: "", zh: "" },
    images: [],
  });
};

const removeShowUnit = (index: number) => {
  form.value.showUnits.splice(index, 1);
};

// Hero Carousel functions
const addCarouselItem = () => {
  form.value.heroCarousel.push({
    image: "",
    title: { en: "", th: "", zh: "" },
    description: { en: "", th: "", zh: "" },
    buttonText: { en: "View Project", th: "ดูโครงการ", zh: "查看项目" },
    buttonLink: "",
    active: true,
    order: form.value.heroCarousel.length,
  });
};

const removeCarouselItem = (index: number) => {
  form.value.heroCarousel.splice(index, 1);
  // Update order for remaining items
  form.value.heroCarousel.forEach((item, idx) => {
    item.order = idx;
  });
};

// Carousel image upload is now handled by ImageUpload component

// Gallery functions
const addGalleryItem = () => {
  form.value.gallery.push({
    tag: { en: "", th: "", zh: "" },
    images: [],
  });
};

const removeGalleryItem = (index: number) => {
  form.value.gallery.splice(index, 1);
};

// Brochure upload
const handleBrochureUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  // Convert to base64 or upload to server
  const reader = new FileReader();
  reader.onload = (e) => {
    form.value.brochure = {
      name: file.name,
      data: e.target?.result as string,
      type: file.type,
    };
  };
  reader.readAsDataURL(file);
};

const handleSubmit = async () => {
  // Validate main project image
  if (!form.value.image?.trim()) {
    alert("Please upload a main project image");
    return;
  }

  // Validate that at least one language has content for required fields
  const hasTitle =
    form.value.title.en || form.value.title.th || form.value.title.zh;
  const hasDescription =
    form.value.description.en ||
    form.value.description.th ||
    form.value.description.zh;

  if (!hasTitle) {
    alert("Please enter a project title in at least one language");
    return;
  }

  if (!hasDescription) {
    alert("Please enter a project description in at least one language");
    return;
  }

  saving.value = true;
  try {
    // Clean up empty neighborhoods
    form.value.neighborhoods = form.value.neighborhoods.filter(
      (n) => n.number || n.name.en || n.name.th || n.name.zh
    );

    await $fetch("/api/projects", {
      method: "POST",
      body: form.value,
    });
    navigateTo("/admin/projects");
  } catch (error) {
    console.error("Failed to create project:", error);
    alert("Failed to create project");
  } finally {
    saving.value = false;
  }
};
</script>
