<template>
  <div>
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{
      label
    }}</label>
    <textarea
      :id="id"
      rows="4"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      :placeholder="placeholder"
      v-model="(data as any)"
    ></textarea>
    <small class="text-red-500" v-for="error in errors" :key="error.$uid">{{
      error.$message
    }}</small>
  </div>
</template>

<script setup lang="ts">
import { ErrorObject } from "@vuelidate/core";

const id = useUUID();
const props = defineProps<{
  errors?: ErrorObject[];
  modelValue?: string | null;
  placeholder?: string;
  label: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const data = useVModel(props, "modelValue", emit);
</script>
