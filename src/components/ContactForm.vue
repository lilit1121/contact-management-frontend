<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-600">Name</label>
      <input
        v-model="contact.name"
        type="text"
        class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200"
        required
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-600">Email</label>
      <input
        v-model="contact.email"
        type="email"
        class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200"
        required
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-600">Phone</label>
      <input
        v-model="contact.phone"
        type="text"
        class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200"
      />
    </div>
    <button
      type="submit"
      class="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
    >
      Save Changes
    </button>
    <button
      @click="router.push('/')"
      class="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
    >
      Back
    </button>
  </form>
</template>

<script>

import {computed, ref, onMounted} from "vue";
import {email, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useRouter} from "vue-router";

export default {
  name: "ContactForm",
  props: {
    contactModel: {
      type: Object,
      required: false,
    },
  },
  emits: ['formSubmitted'],
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
