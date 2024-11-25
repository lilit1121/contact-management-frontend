<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-xl font-semibold text-gray-700 mb-6">Add New Contact</h1>
      <ContactForm @formSubmitted="addNewContact" :loading="loading" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useContactStore } from '../store/contactStore.js';
import { useRouter } from 'vue-router';
import ContactForm from "@/components/ContactForm.vue";
export default defineComponent({
  components: {ContactForm},
  setup() {
    const router = useRouter();
    const store = useContactStore();
    const loading = ref(false);

    const addNewContact = async (data) => {
      loading.value = true;
      await store.addContact(data);
      loading.value = false;
      router.push('/');
    };

    return {
      addNewContact,
      loading
    };
  },
});
</script>
