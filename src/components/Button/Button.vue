<template>
  <button
    class="w-full text-white py-2 px-3 rounded-lg shadowfocus:outline-none focus:ring"
    :class="getVariantClasses"
    :disabled="disabled"
    :type="type"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const getVariantClasses = computed(() => {
  let classes = ''
  if (props.variant === 'primary') {
    classes = 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
  }
  if (props.variant === 'secondary') {
    classes = 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300'
  }
  if (props.variant === 'danger') {
    classes = 'bg-red-500 hover:bg-red-600 focus:ring-red-300'
  }
  return classes
})
</script>
