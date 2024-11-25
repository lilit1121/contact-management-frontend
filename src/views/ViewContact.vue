<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Contact Details</h1>
    <div v-if="contact" class="bg-gray-100 p-4 rounded">
      <p><strong>Name:</strong> {{ contact.name }}</p>
      <p><strong>Email:</strong> {{ contact.email }}</p>
      <p><strong>Phone:</strong> {{ contact.phone }}</p>
      <Button variant="secondary" @click="goBack" class="mt-4 w-max">Back</Button>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useContactStore } from '../store/contactStore.js';
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/Button/Button.vue';

export default defineComponent({
  components: {
    Button
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useContactStore();
    const contact = ref(null);

    onMounted(async () => {
      contact.value = await store.fetchContact(Number(route.params.id));
    });

    const goBack = () => {
      router.push('/');
    };

    return {
      contact,
      goBack,
    };
  },
});
</script>
