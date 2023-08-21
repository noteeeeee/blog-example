<template>
  <div>
    <ClientOnly>
      <label class="block mb-2 text-sm font-medium text-gray-900">{{
        label
      }}</label>
      <QuillEditor :content="data" @update:content="onEditorChange($event)" content-type="html" />
      <small class="text-red-500" v-for="error in errors" :key="error.$uid">{{
        error.$message
      }}</small>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import { ErrorObject } from "@vuelidate/core";

const props = defineProps<{
  errors?: ErrorObject[];
  modelValue?: string | null;
  label: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const data = useVModel(props, "modelValue", emit);

function onEditorChange(e: any) {
  data.value = e
}
</script>
