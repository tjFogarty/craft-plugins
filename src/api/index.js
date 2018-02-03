import axios from 'axios'

let instance = axios.create({
  baseURL: 'https://packagist.org/'
})

export default instance
