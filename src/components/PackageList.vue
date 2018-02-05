<template>
  <div class="package-list">
    <div v-if="!isLoading">
      <paginate
        class="package-list__results"
        v-if="filteredPackages.length"
        name="packages"
        :list="filteredPackages"
        :per="10"
      >
        <li v-for="pkg in paginated('packages')" :key="pkg.name">
          <SinglePackage :sortedBy="sortBy" :pkg="pkg" />
        </li>
      </paginate>
      
      <h2 v-else>No results found for "{{ searchTerm }}".</h2>
      
      <paginate-links
        for="packages" 
        v-if="filteredPackages.length"
        @change="onPageChange"
        :async="true"
        :limit="4"
        :show-step-links="true"
      ></paginate-links>
    </div>
    
    <Loading />
  </div>
</template>

<script>
import SinglePackage from './SinglePackage.vue'
import Loading from './Loading.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'PackageList',

  components: { SinglePackage, Loading },

  data() {
    return {
      paginate: ['packages']
    }
  },

  computed: {
    ...mapGetters(['filteredPackages']),
    ...mapState(['isLoading', 'searchTerm', 'sortBy'])
  },

  async mounted() {
    await this.$store.dispatch('getPackageList')
    this.$store.dispatch('getPackages')
  },

  methods: {
    ...mapActions(['getPackages', 'getPackageList']),

    onPageChange() {
      window.scroll({
        behavior: 'smooth',
        top: 0
      })
    }
  }
}
</script>

<style>
.package-list__results {
  display: grid;
  grid-template-columns: repeat(2, minmax(400px, 1fr));
  grid-gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.paginate-links {
  position: sticky;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0;
  padding: 20px 0;
  list-style: none;
}

.paginate-links > li {
  display: inline-block;
  margin-right: 5px;
  padding: 4px;
}

.paginate-links a {
  cursor: pointer;
}

.number.active {
  color: var(--c-primary);
}
</style>