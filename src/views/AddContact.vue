<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-xl font-semibold text-gray-700 mb-6">Add New Contact</h1>
      <ContactForm @formSubmitted="addNewContact"/>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { useContactStore } from '../store/contactStore.js';
import { useRouter } from 'vue-router';
import ContactForm from "@/components/ContactForm.vue";
export default defineComponent({
  components: {ContactForm},
  setup() {
    const router = useRouter();
    const store = useContactStore();

    const addNewContact = async (data) => {
      await store.addContact(data);
      router.push('/');
    };

    return {
      addNewContact,
    };
  },
});
</script>
