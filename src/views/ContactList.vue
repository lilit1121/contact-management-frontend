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
          <div class="flex gap-2">
            <Button @click="editContact(contact.id)">Edit</Button>
            <Button variant="danger" @click="deleteContactHandler(contact.id)">Delete</Button>
            <Button variant="secondary" @click="router.push(`/view/${contact.id}`)">View</Button>
          </div>
        </div>
      </div>

      <div v-else-if="!contacts.length && !isLoading" class="text-center text-gray-500">
        <p>No contacts found. Add some contacts to get started!</p>
      </div>
      <Button class="w-max mt-4" variant="secondary" @click="router.push('/add')">Add Contact</Button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useContactStore } from '../store/contactStore.js'
import { useRouter } from 'vue-router'
import Button from '../components/Button/Button.vue'

export default defineComponent({
  name: 'ContactList',
  components: {
    Button,
  },
  setup() {
    const store = useContactStore()
    const router = useRouter()
    const isLoading = ref(true)
    const contacts = computed(() => store.contacts)
    const errorMessage = computed(() => store.errorMessage)

    onMounted(async () => {
      try {
        isLoading.value = true
        await store.fetchContacts()
      } catch (error) {
        console.error('Error fetching contacts:', error)
      } finally {
        isLoading.value = false
      }
    })

    const editContact = (id) => {
      router.push(`/edit/${id}`)
    }

    const deleteContactHandler = async (id) => {
      try {
        await store.deleteContact(id)
      } catch (error) {
        console.error('Error deleting contact:', error)
      }
    }

    return {
      router,
      contacts,
      errorMessage,
      isLoading,
      editContact,
      deleteContactHandler,
    }
  },
})
</script>

<style scoped></style>
