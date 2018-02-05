import axios from 'axios'
import api from '../api'
import storage from '../api/storage'
import * as types from './mutation-types'
import { INCREMENT_PACKAGES_LOADED_COUNT } from './mutation-types';

const PACKAGE_LIST = 'package_list'
const PACKAGE_LIST_DATA = 'package_list_data'

function formatPackage(pkg) {
  let single = pkg.data.package

  return {
    ...single,
    downloads_total: single.downloads.total,
    downloads_daily: single.downloads.daily,
    downloads_monthly: single.downloads.monthly
  }
}

export default {
  async getPackageList({ state, dispatch, commit }) {
    let localData = storage.load(PACKAGE_LIST)

    if (!localData) {
      commit(types.SET_LOADING, true)
      let { data } = await api.get('packages/list.json?type=craft-plugin')
      commit(
        types.SET_PACKAGE_LIST,
        storage.save(PACKAGE_LIST, data.packageNames)
      )
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

      let data = responses.map(formatPackage)

      commit(types.SET_LOADING, false)
      commit(types.SET_PACKAGES, storage.save(PACKAGE_LIST_DATA, data))
    } else {
      commit(types.SET_LOADING, false)
      commit(types.SET_PACKAGES, localData)
    }
  }
}
