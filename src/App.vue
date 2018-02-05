<template>
  <div id="app">
    <div class="content">
      <Sidebar />
      <PackageList />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import PackageList from './components/PackageList.vue'
import 'normalize.css'

export default {
  name: 'app',

  components: { Sidebar, PackageList }
}
</script>

<style>
:root {
  --font-stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --c-colour: #2c3e50;
  --c-primary: #da5a47;
}

#app {
  font-family: var(--font-stack);
  -moz-osx-font-smoothing: grayscale;
  color: var(--c-colour);
  margin: 70px auto;
  max-width: 1200px;
}

.content {
  display: grid;
  grid-template-columns: 20% auto;
  grid-gap: 15px;
  align-items: start;
}
</style>
