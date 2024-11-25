<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-50">
    <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-700 mb-6">Contact List</h1>

      <div v-if="errorMessage" class="mb-4 p-4 bg-red-100 text-red-700 rounded">
        {{ errorMessage }}
      </div>

      <div v-if="isLoading" class="text-center text-gray-500">
        <p>Loading ...</p>
      </div>

      <div v-if="contacts.length && !isLoading" class="space-y-4">
        <div
          v-for="contact in contacts"
          :key="contact.id"
          class="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
        >

          <div>
            <p class="font-semibold text-gray-800">{{ contact.name }}</p>
            <p class="text-gray-600">{{ contact.email }}</p>
            <p class="text-gray-600">{{ contact.phone }}</p>
          </div>
          <div class="space-x-2">
            <button
              @click="editContact(contact.id)"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Edit
            </button>
            <button
              @click="deleteContactHandler(contact.id)"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              @click="router.push(`/view/${contact.id}`)"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="!contacts.length && !isLoading" class="text-center text-gray-500">
        <p>No contacts found. Add some contacts to get started!</p>
      </div>
      <button
        @click="router.push('/add')"
        class="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
      >
        Add Contact
      </button>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useContactStore} from '../store/contactStore.js';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ContactList',
  setup() {
    const store = useContactStore();
    const router = useRouter();
    const isLoading = ref(true);
    const contacts = computed(() => store.contacts);
    const errorMessage = computed(() => store.errorMessage);

    onMounted(async () => {
      try {
        isLoading.value = true;
        await store.fetchContacts();
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        isLoading.value = false;
      }
    });

    const editContact = (id) => {
      router.push(`/edit/${id}`);
    };

    const deleteContactHandler = async (id) => {
      try {
        await store.deleteContact(id);
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    };

    return {
      router,
      contacts,
      errorMessage,
      isLoading,
      editContact,
      deleteContactHandler,
    };
  },
});
</script>

<style scoped>

</style>
