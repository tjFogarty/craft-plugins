import collect from 'collect.js'

export function sortByProperty(list, property) {
  let collection = collect(list)
  let result = collection.sortByDesc(property)
  return result.all()
}

export function search(list, searchTerm) {
  let term = searchTerm.toLowerCase().trim()

  if (!term) return list

  return list.filter(item => {
    return matchesNameOrDescription(item, term)
  })
}

export function matchesNameOrDescription(item, term) {
  let name = item.name.toLowerCase()
  let description = item.description.toLowerCase()

  return name.search(term) !== -1 || description.search(term) !== -1
}
