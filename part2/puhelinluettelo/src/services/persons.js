import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}
export default { getAll, create, update, remove}



