// Auth types
export interface LoginForm {
  username: string; // CPF (sem pontos/traços)
  password: string;
}

export interface RegisterForm {
  nome: string;           // obrigatório, max 200 chars
  sexo?: 'M' | 'F';      // opcional
  email?: string;         // opcional, validação email
  dataNascimento: string; // obrigatório, formato YYYY-MM-DD
  naturalidade?: string;  // opcional, max 100 chars
  nacionalidade?: string; // opcional, max 100 chars  
  cpf: string;           // obrigatório, max 14 chars
  password: string;       // obrigatório, 6-100 chars
}

export interface AuthResponse {
  token: string;
  username: string;
  nome?: string;  // Adicionando nome do usuário
  expiresAt: string;
}

export interface AuthError {
  message: string;
}

export interface RegisterResponse {
  message: string;
  username: string;
  email: string;
}

// Person types
export interface Person {
  id: number;
  nome: string;
  sexo?: 'M' | 'F';
  email?: string;
  dataNascimento: string;
  naturalidade?: string;
  nacionalidade?: string;
  cpf: string;
  createdAt: string;
  updatedAt: string;
}

export interface PersonForm {
  nome: string;           // obrigatório
  sexo?: 'M' | 'F';
  email?: string;
  dataNascimento: string; // obrigatório
  naturalidade?: string;
  nacionalidade?: string;
  cpf: string;           // obrigatório
}

// Grid types
export interface GridControls {
  search: string;          // filtro local
  pageSize: number;        // 10, 25, 50
  currentPage: number;     // paginação
}

// API Error type
export interface ApiError {
  message: string;
  details?: string;
}

// Auth Context types
export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  nome: string | null;  // Adicionando nome
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
