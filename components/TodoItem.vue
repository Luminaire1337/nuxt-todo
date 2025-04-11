<template>
  <li
    class="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
  >
    <div class="flex items-center">
      <input
        :checked="todo.completed"
        @change.prevent="toggleTodo(todo.id, !todo.completed)"
        type="checkbox"
        class="form-checkbox h-5 w-5 text-indigo-600 focus:ring-indigo-500"
      />
      <span
        :class="{
          'line-through text-gray-400': todo.completed,
          'text-gray-800': !todo.completed,
        }"
        class="ml-3 text-lg font-medium"
      >
        {{ todo.title }}
      </span>
    </div>
    <button
      class="text-red-500 hover:text-red-700 transition-colors"
      @click="deleteTodo(todo.id)"
    >
      <Icon name="mdi:delete" size="1.5em" />
    </button>
  </li>
</template>

<script lang="ts" setup>
import type Todo from "~/types/Todo";

const props = defineProps<{
  todo: Todo;
  refreshFn: () => void;
}>();

async function deleteTodo(id: number) {
  await $fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });

  // Refresh the todo list after deleting a todo
  props.refreshFn();
}

async function toggleTodo(id: number, completed: boolean) {
  await $fetch(`/api/todos/${id}`, {
    method: "PATCH",
    body: { completed },
  });

  // Refresh the todo list after toggling a todo
  props.refreshFn();
}
</script>
