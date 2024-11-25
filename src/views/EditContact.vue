<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-xl font-semibold text-gray-700 mb-6">Edit Contact</h1>
      <ContactForm v-if="contact" :contactModel="contact" @formSubmitted="updateExistingContact" />
      <div v-else class="text-center text-gray-500">Loading...</div>
    </div>
  </div>
</template>

<script lang="js">
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

    onMounted(async () => {
      contact.value = await store.fetchContact(Number(route.params.id));
    });

    const updateExistingContact = async (data) => {
      await store.updateContact(Number(route.params.id), {
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      router.push('/');
    };

    return {
      contact,
      updateExistingContact,
    };
  },
});
</script>
