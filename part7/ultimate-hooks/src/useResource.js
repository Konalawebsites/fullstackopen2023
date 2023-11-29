
import { useState, useEffect } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {

    const [resources, setResources] = useState([]);

    useEffect(() => {
        getAll(); // Fetch notes resources on component mount
    }, []);

    const create = async (resource) => {
        try {
            const response = await axios.post(baseUrl, resource);
            setResources([...resources, response.data]); // Assuming response.data contains the newly created resource
        } catch (error) {
            console.error('Error creating resource:', error);
        }
    };

    const getAll = async () => {
        try {
            const response = await axios.get(baseUrl);
            setResources(response.data); // Assuming response.data contains the newly created resource
        } catch (error) {
            console.error('Error creating resource:', error);
        }
    };

    return [resources, { create }]
};

export default useResource;