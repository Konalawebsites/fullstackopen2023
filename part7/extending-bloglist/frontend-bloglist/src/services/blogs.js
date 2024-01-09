import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const create = async newObject => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const update = async (blog) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blog.blogId}`, blog.blog, config)
  return response.data
}

export const remove = async (blogId) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)

  return response.data
}

export default { getAll, setToken }