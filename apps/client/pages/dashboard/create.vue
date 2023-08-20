<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Create new article
      </h2>
      <form action="#">
        <div class="flex flex-col gap-6">
          <TextField
            class="sm:col-span-2"
            label="Title"
            type="text"
            placeholder="Article title"
          />
          <TextAreaField
            class="sm:col-span-2"
            label="Short content"
            placeholder="Article short content..."
          />
          <EditorField class="sm:col-span-2" label="Content" />
          <button-with-loading
            label="Publish article"
            type="submit"
            :loading="false"
          />
        </div>
      </form>
    </div>
  </section>
</template>
