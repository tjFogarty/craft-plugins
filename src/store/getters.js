import { sortByProperty, search } from '../search'

export default {
  filteredPackages({ packages, sortBy, searchTerm }) {
    return search(sortByProperty(packages, sortBy), searchTerm)
  },

  packagesCount({ packageList }) {
    return packageList.length
  }
}
