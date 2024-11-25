<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-600">Name</label>
      <input
        v-model="contact.name"
        type="text"
        class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200"
      />
      <span v-if="nameError" class="text-xs text-red-700">{{ nameError }}</span>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-600">Email</label>
      <input
        v-model="contact.email"
        type="email"
        class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200"
      />
      <span v-if="emailError" class="text-xs text-red-700">{{ emailError }}</span>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-600">Phone</label>
      <input
        v-model="contact.phone"
        type="text"
        class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200"
      />
      <span v-if="phoneError" class="text-xs text-red-700">{{ phoneError }}</span>
    </div>
    <Button type="submit" :disabled="loading">Save Changes</Button>
    <Button variant="secondary" :disabled="loading" @click="router.push('/')">Back</Button>
  </form>
</template>

<script>

import {computed, ref, onMounted} from "vue";
import {email, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useRouter} from "vue-router";
import Button from '@/components/Button/Button.vue';

export default {
  name: "ContactForm",
  props: {
    contactModel: {
      type: Object,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['formSubmitted'],
  components: {
    Button,
  },
  setup(props, ctx) {
    const contact = ref({ name: '', email: '', phone: '' });
    const router = useRouter();

    onMounted(() => {
      if (props.contactModel) {
        contact.value = {
          name: props.contactModel.name,
          email: props.contactModel.email,
          phone: props.contactModel.phone,
        }
      }
    });

    const rules = {
      name: { required },
      email: { required, email },
      phone: { required },
    };

    const v$ = useVuelidate(rules, contact);

    const nameError = computed(() => {
      if (v$.value.name.$errors.some(error => error.$validator === 'required')) {
        return 'Name is required.';
      }
      return '';
    });

    const emailError = computed(() => {
      if (v$.value.email.$errors.some(error => error.$validator === 'required')) {
        return 'Email is required.';
      }
      if (v$.value.email.$errors.some(error => error.$validator === 'email')) {
        return 'Invalid email format.';
      }
      return '';
    });

    const phoneError = computed(() => {
      if (v$.value.phone.$errors.some(error => error.$validator === 'required')) {
        return 'Phone number is required.';
      }
      return '';
    });

    const submitForm = async () => {
      v$.value.$touch();
      if (!v$.value.$invalid) {
        ctx.emit('formSubmitted', contact.value);
      }
    };

    return {
      v$,
      phoneError,
      emailError,
      nameError,
      contact,
      router,
      submitForm,
    };
  },
}
</script>

<style scoped>

</style>
