<template>
  <div class="sidebar">
    <img class="sidebar__logo" src="../assets/craft-logo.svg" />
    <h1 class="sidebar__title">Plugins</h1>
    
    <label class="sidebar__label" for="search">Search</label>
    <input v-model="searchTerm" type="search" id="search" placeholder="e.g., SEO" />
    
    <p>Sort by:</p>
    <label class="sidebar__label">
      <input type="radio" name="sort" value="github_stars" v-model="sortBy" />
      GitHub Stars
    </label>
    
    <label class="sidebar__label">
      <input type="radio" name="sort" value="downloads_total" v-model="sortBy" />
      Downloads (Total)
    </label>
    
    <label class="sidebar__label">
      <input type="radio" name="sort" value="downloads_monthly" v-model="sortBy" />
      Downloads (Monthly)
    </label>
    
    <label class="sidebar__label">
      <input type="radio" name="sort" value="downloads_daily" v-model="sortBy" />
      Downloads (Daily)
    </label>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',

  computed: {
    searchTerm: {
      get() {
        return this.$store.state.searchTerm
      },

      set(value) {
        this.$store.commit('SET_SEARCH_TERM', value)
      }
    },

    sortBy: {
      get() {
        return this.$store.state.sortBy
      },

      set(value) {
        this.$store.commit('SET_SORT_BY', value)
      }
    }
  }
}
</script>

<style>
.sidebar {
  position: sticky;
  top: 0;
}

.sidebar__label {
  display: block;
  margin-bottom: 10px;
}

.sidebar__logo {
  margin-top: 0.67em;
  max-width: 165px;
}

.sidebar__title {
  margin-top: 0;
  font-weight: 200;
}
</style>
