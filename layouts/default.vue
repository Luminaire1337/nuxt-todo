<template>
  <div
    class="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 antialiased"
  >
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-indigo-600">
            <span class="flex items-center gap-2">
              <Icon name="mdi:check-all" class="text-indigo-500" size="1.5em" />
              Nuxt Todo
            </span>
          </h1>
          <nav>
            <ul class="flex space-x-4">
              <li>
                <NuxtLink
                  to="/"
                  class="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                >
                  Zadania
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/about"
                  class="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                >
                  O aplikacji
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <slot />
      </div>
    </main>

    <footer class="bg-white border-t mt-auto">
      <div class="container mx-auto px-4 py-6">
        <p class="text-center text-gray-500 text-sm">
          &copy; {{ new Date().getFullYear() }} Nuxt Todo App
        </p>
      </div>
    </footer>
  </div>
</template>
