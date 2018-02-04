<template>
  <div id="app">
    <div class="content">
      
      <div class="sidebar">
  
        <img class="craft-logo" src="./assets/craft-logo.svg" />
        <h1 class="page-title">Plugins</h1>
        
        <label for="search">Search</label>
        <input v-model="searchTerm" id="search" placeholder="e.g., SEO" />
        
        <p>Sort by:</p>
        <label>
          <input type="radio" name="sort" value="github_stars" v-model="sortBy" />
          GitHub Stars
        </label>
        
        <label>
          <input type="radio" name="sort" value="downloads_total" v-model="sortBy" />
          Downloads (Total)
        </label>
        
        <label>
          <input type="radio" name="sort" value="downloads_monthly" v-model="sortBy" />
          Downloads (Monthly)
        </label>
        
        <label>
          <input type="radio" name="sort" value="downloads_daily" v-model="sortBy" />
          Downloads (Daily)
        </label>
      </div>
    
      <div class="results">
        <div v-if="!isLoading">
          <paginate
            class="package-list"
            v-if="filteredPackages.length"
            name="packages"
            :list="filteredPackages"
            :per="10"
          >
            <li v-for="pkg in paginated('packages')" :key="pkg.name">
              <SinglePackage :sortedBy="sortBy" :pkg="pkg" />
            </li>
          </paginate>
          
          <paginate-links
            for="packages" 
            @change="onPageChange"
            :async="true"
            :limit="4"
            :show-step-links="true"
          ></paginate-links>
        </div>
        
        <transition name="fade">
          <div class="loading" v-if="isLoading">
            <p>Loading packages</p>
            <progress :value="packagesLoaded" :max="packageList.length" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import api from './api'
import storage from './api/storage'
import axios from 'axios'
import { sortByProperty, search } from './search'
import SinglePackage from './components/SinglePackage.vue'
import 'normalize.css'

const PACKAGE_LIST = 'package_list'
const PACKAGE_LIST_DATA = 'package_list_data'

export default {
  name: 'app',

  components: { SinglePackage },

  data() {
    return {
      packageList: [],
      packagesLoaded: 0,
      pkgs: [],
      paginate: ['packages'],
      searchTerm: '',
      sortBy: '',
      isLoading: false
    }
  },

  computed: {
    filteredPackages() {
      if (!this.sortBy && !this.searchTerm) {
        return this.pkgs
      }

      return search(sortByProperty(this.pkgs, this.sortBy), this.searchTerm)
    }
  },

  mounted() {
    let data = storage.load(PACKAGE_LIST_DATA)

    if (!data) {
      this.isLoading = true
      this.getPackageList()
    } else {
      this.pkgs = data
      this.isLoading = false
    }
  },

  methods: {
    async getPackageList() {
      let { data } = await api.get('packages/list.json?type=craft-plugin')
      this.packageList = storage.save(PACKAGE_LIST, data.packageNames)
      this.getPackagesData()
    },

    async getPackagesData() {
      let requestList = this.packageList.map(pkg => `packages/${pkg}.json`)
      let responses = await axios.all(
        requestList.map(req =>
          api.get(req).then(res => {
            this.packagesLoaded++
            return res
          })
        )
      )
      let data = responses.map(this.formatPackage)

      this.isLoading = false
      this.pkgs = storage.save(PACKAGE_LIST_DATA, data)
    },

    formatPackage(pkg) {
      let single = pkg.data.package

      return {
        ...single,
        downloads_total: single.downloads.total,
        downloads_daily: single.downloads.daily,
        downloads_monthly: single.downloads.monthly
      }
    },

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

.sidebar {
  position: sticky;
  top: 0;
}

.sidebar label {
  display: block;
  margin-bottom: 10px;
}

.package-list {
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
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
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

.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.craft-logo {
  margin-top: 0.67em;
  max-width: 165px;
}

.page-title {
  margin-top: 0;
  font-weight: 200;
}
</style>
