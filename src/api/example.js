import axios from '../assets/js/axios'
const baseUrl = '/api/'

export function getNodeContent (params) {
  return axios.getData(baseUrl + 'cms-service/cms/content/getNodeContent',{params})
}
