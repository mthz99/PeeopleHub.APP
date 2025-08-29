import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { AuthResponse, Person, PersonForm, RegisterForm, LoginForm } from '../types';

const API_BASE_URL = 'https://PeopleHubAPI.somee.com';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle 401 errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(credentials: LoginForm): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/api/Auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterForm): Promise<{ message: string; username: string; email: string }> {
    const response = await this.api.post('/api/Auth/register', userData);
    return response.data;
  }

  // People endpoints
  async getPeople(): Promise<Person[]> {
    const response: AxiosResponse<Person[]> = await this.api.get('/api/v1/PeopleHub');
    return response.data;
  }

  async getPerson(id: number): Promise<Person> {
    const response: AxiosResponse<Person> = await this.api.get(`/api/v1/PeopleHub/${id}`);
    return response.data;
  }

  async createPerson(personData: PersonForm): Promise<Person> {
    const response: AxiosResponse<Person> = await this.api.post('/api/v1/PeopleHub', personData);
    return response.data;
  }

  async updatePerson(id: number, personData: PersonForm): Promise<Person> {
    const response: AxiosResponse<Person> = await this.api.put(`/api/v1/PeopleHub/${id}`, personData);
    return response.data;
  }

  async deletePerson(id: number): Promise<void> {
    await this.api.delete(`/api/v1/PeopleHub/${id}`);
  }
}

export const apiService = new ApiService();
