<template>
  <div>
    <h2 class="title">{{ pkg.name }}</h2>
    <p>{{ pkg.description }}</p>
    <p>{{ downloads }}</p>
    <p>Favs: {{ pkg.favers }}</p>
    <p>GitHub Stars: {{ pkg.github_stars }}</p>
    <p>Repository: <a class="repo-link" :href="pkg.repository" target="_blank" rel="noopener">{{ pkg.repository }}</a> </p>
  </div>
</template>

<script>
export default {
  name: 'SinglePackage',

  props: {
    pkg: {
      type: Object,
      required: true
    },
    sortedBy: {
      type: String
    }
  },

  computed: {
    downloads() {
      switch (this.sortedBy) {
        case 'downloads_monthly':
          return `Downloads (Monthly): ${this.pkg.downloads_monthly}`
          break

        case 'downloads_daily':
          return `Downloads (Daily): ${this.pkg.downloads_daily}`
          break

        default:
          return `Downloads (Total): ${this.pkg.downloads_total}`
          break
      }
    }
  }
}
</script>

<style scoped>
.title,
.repo-link {
  color: var(--c-primary);
}
</style>
