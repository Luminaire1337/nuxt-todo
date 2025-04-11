<template>
  <form class="flex items-center space-x-4" @submit.prevent="addTodo">
    <input
      v-model="newTodo"
      type="text"
      placeholder="Dodaj nowe zadanie"
      class="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <button
      type="submit"
      class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
    >
      Dodaj
    </button>
  </form>
</template>

<script lang="ts" setup>
const props = defineProps<{
  refreshFn: () => void;
}>();

const newTodo = ref("");

async function addTodo() {
  const value = newTodo.value.trim();
  if (!value) {
    return;
  }

  await $fetch("/api/todos", {
    method: "POST",
    body: { title: value },
  });

  newTodo.value = "";

  // Refresh the todo list after adding a new todo
  props.refreshFn();
}
</script>
