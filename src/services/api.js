import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Change according to your preference
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    getTasks(page = 1) {
        return apiClient.get(`/tasks?page=${page}`);
    },
    addTask(task) {
        return apiClient.post('/tasks', task);
    },
    updateTask(id, task) {
        return apiClient.put(`/tasks/${id}`, task);
    },
    deleteTask(id) {
        return apiClient.delete(`/tasks/${id}`);
    },
};
