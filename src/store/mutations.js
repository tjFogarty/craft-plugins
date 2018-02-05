import * as types from './mutation-types'

export default {
  [types.SET_PACKAGES](state, packages) {
    state.packages = packages
  },

  [types.SET_PACKAGE_LIST](state, packageList) {
    state.packageList = packageList
  },

  [types.SET_SORT_BY](state, sortBy) {
    state.sortBy = sortBy
  },

  [types.SET_SEARCH_TERM](state, searchTerm) {
    state.searchTerm = searchTerm
  },

  [types.SET_LOADING](state, isLoading) {
    state.isLoading = isLoading
  },

  [types.INCREMENT_PACKAGES_LOADED_COUNT](state) {
    state.packagesLoaded = state.packagesLoaded + 1
  }
}
