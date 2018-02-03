// https://gist.github.com/anhang/1096149
const storage = {
  // default expiration minutes is 1140 = 1 day
  save(key, jsonData, expirationMin = 1140) {
    let expirationMS = expirationMin * 60 * 1000
    let record = {
      value: JSON.stringify(jsonData),
      timestamp: new Date().getTime() + expirationMS
    }

    localStorage.setItem(key, JSON.stringify(record))
    return jsonData
  },
  load(key) {
    if (!localStorage.getItem(key)) return false

    let record = JSON.parse(localStorage.getItem(key))
    return new Date().getTime() < record.timestamp && JSON.parse(record.value)
  }
}

export default storage
