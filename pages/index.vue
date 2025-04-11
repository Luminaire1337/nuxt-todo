<template>
  <div>
    <TodoForm :refreshFn="fetchTodos" />
    <TodoItem
      v-for="todo in page.todos"
      :key="todo.id"
      :todo="todo"
      :refreshFn="fetchTodos"
    />

    <div class="flex justify-between mt-4">
      <button
        :disabled="!page.pagination.hasPrevPage"
        @click="page.pagination.currentPage-- && fetchTodos()"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Poprzednia
      </button>
      <button
        :disabled="!page.pagination.hasNextPage"
        @click="page.pagination.currentPage++ && fetchTodos()"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Następna
      </button>
    </div>
    <div class="mt-4">
      <p class="text-gray-600">
        Strona {{ page.pagination.currentPage }} z
        {{ Math.max(page.pagination.totalPages, 1) }}
      </p>
      <p class="text-gray-600">
        Łącznie {{ page.pagination.totalCount }} zadań
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type TodosResponse from "~/types/TodosResponse";

const page = reactive<TodosResponse>({
  todos: [],
  pagination: {
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null,
  },
});

async function fetchTodos() {
  const response = await $fetch(
    `/api/todos?page=${page.pagination.currentPage}`,
    {
      method: "GET",
    }
  );

  page.todos = response.todos;
  page.pagination = response.pagination;
}

fetchTodos();
</script>
