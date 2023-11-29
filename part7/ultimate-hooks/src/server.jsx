import axios from 'axios'

const [resources, setResources] = useState([])

const getResources = async (baseUrl) => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    setResources(data);
  } catch (error) {
    console.error('Error fetching resources:', error);
  }
}

const create = (resource) => {
  // ...
}

const service = {
  create
}




export default { resources, create }