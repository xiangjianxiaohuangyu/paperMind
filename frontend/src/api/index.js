import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const paperAPI = {
  upload: (formData) => {
    return api.post('/papers/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  list: (params) => {
    return api.get('/papers', { params });
  },

  detail: (id) => {
    return api.get(`/papers/${id}`);
  },

  analyze: (id) => {
    return api.post(`/papers/${id}/analyze`);
  }
};

export const userAPI = {
  getUser: (id) => {
    return api.get(`/users/${id}`);
  }
};

export default api;
