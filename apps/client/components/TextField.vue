<template>
  <div>
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{
      label
    }}</label>
    <input
      :required="required"
      :type="type"
      :id="id"
      v-model="data"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      :placeholder="placeholder"
    />
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
  required?: boolean;
  label: string;
  type: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const data = useVModel(props, "modelValue", emit);
</script>
