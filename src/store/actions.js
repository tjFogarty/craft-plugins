import axios from 'axios'
import api from '../api'
import storage from '../api/storage'
import * as types from './mutation-types'
import { INCREMENT_PACKAGES_LOADED_COUNT } from './mutation-types'

const PACKAGE_LIST = 'package_list'
const PACKAGE_LIST_DATA = 'package_list_data'

function formatPackage(pkg) {
  console.log(pkg, pkg.data, pkg.data.package)
  let single = pkg.data.package
  let total = 0
  let daily = 0
  let monthly = 0

  if (single.downloads) {
    total = single.downloads.total || 0
    daily = single.downloads.daily || 0
    monthly = single.downloads.monthly || 0
  }

  console.log(total)

  return {
    ...single,
    downloads_total: total,
    downloads_daily: daily,
    downloads_monthly: monthly
  }
}

export default {
  async getPackageList({ state, dispatch, commit }) {
    let localData = storage.load(PACKAGE_LIST)

    if (!localData) {
      commit(types.SET_LOADING, true)
      let { data } = await api.get('packages/list.json?type=craft-plugin')
      commit(types.SET_PACKAGE_LIST, data.packageNames)

      try {
        storage.save(PACKAGE_LIST, data.packageNames)
      } catch (e) {
        console.log(e)
      }
    } else {
      commit(types.SET_PACKAGE_LIST, localData)
      commit(types.SET_LOADING, false)
    }
  },

  async getPackages({ state, commit }) {
    let localData = storage.load(PACKAGE_LIST_DATA)

    if (!localData) {
      commit(types.SET_LOADING, true)

      let requestList = state.packageList.map(pkg => `packages/${pkg}.json`)
      let responses = await axios.all(
        requestList.map(req =>
          api.get(req).then(res => {
            commit(INCREMENT_PACKAGES_LOADED_COUNT)
            return res
          })
        )
      )

      let data = responses.filter(pkg => pkg !== null).map(formatPackage)

      commit(types.SET_LOADING, false)
      commit(types.SET_PACKAGES, data)

      try {
        storage.save(PACKAGE_LIST_DATA, data)
      } catch (e) {
        console.log(e)
      }
    } else {
      commit(types.SET_LOADING, false)
      commit(types.SET_PACKAGES, localData)
    }
  }
}
