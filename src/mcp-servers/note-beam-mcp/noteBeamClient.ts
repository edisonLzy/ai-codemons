import axios, { type AxiosInstance } from 'axios';

// Types based on api-gateway routes
export interface User {
  userId: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface HighlightRange {
  start: string;
  startOffset: number;
  end: string;
  endOffset: number;
}

export interface Highlight {
  id: string;
  text: string;
  url: string;
  tag: {
    id: string;
    name: string;
    color: string;
  };
  range: HighlightRange;
  noteId?: string;

  createdAt?: string;
  type?: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  code: number;
  message?: string;
  data: T;
  timestamp: string;
}

export interface ListHighlightsResponse {
  highlights: Highlight[];
  limit: number;
  offset: number;
  hasMore: boolean;
}

export class NoteBeamClient {
  private client: AxiosInstance;
  private token: string | null = null;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add interceptor to inject token
    this.client.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  setToken(token: string) {
    this.token = token;
  }

  async initialize(email: string, password: string): Promise<void> {
    await this.login(email, password);
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.client.post<ApiResponse<LoginResponse>>('/v1/auth/login', {
      email,
      password,
    });
    // API Gateway returns { code: 0, data: { ... }, timestamp: ... }
    const { data } = response.data;
    this.setToken(data.accessToken);
    return data;
  }

  async listHighlights(params: { 
    url?: string; 
    limit?: number; 
    offset?: number;
    startDate?: number;
    endDate?: number;
    tagId?: string;
  } = {}): Promise<Highlight[]> {
    const response = await this.client.get<ApiResponse<ListHighlightsResponse>>('/v1/note-beam/highlights', { params });
    const { data } = response.data;
    
    if (data && Array.isArray(data.highlights)) {
      return data.highlights;
    }
    
    throw new Error('Unexpected API response structure for listHighlights');
  }

}
