<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-xl font-semibold text-gray-700 mb-6">Edit Contact</h1>
      <div v-if="loading" class="text-center text-gray-500">Loading...</div>
      <div v-else-if="!contact" class="text-center text-gray-500">Something went wrong</div>
      <ContactForm v-else :contactModel="contact" @formSubmitted="updateExistingContact" :loading="updateLoading" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useContactStore } from '../store/contactStore.js';
import { useRoute, useRouter } from 'vue-router';
import ContactForm from "@/components/ContactForm.vue";

export default defineComponent({
  components: {ContactForm},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useContactStore();
    const contact = ref(null);
    const loading = ref(true);
    const updateLoading = ref(false);

    onMounted(async () => {
      loading.value = true;
      contact.value = await store.fetchContact(Number(route.params.id));
      loading.value = false;
    });

    const updateExistingContact = async (data) => {
      updateLoading.value = true;
      await store.updateContact(Number(route.params.id), {
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      updateLoading.value = false;
      router.push('/');
    };

    return {
      contact,
      updateExistingContact,
      loading,
      updateLoading,
    };
  },
});
</script>
