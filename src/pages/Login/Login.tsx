import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../../components/common';
import { useToast } from '../../hooks';
import { validateCPF } from '../../utils/helpers';
import type { LoginForm } from '../../types';
import './Login.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { showError } = useToast();
  
  const [formData, setFormData] = useState<LoginForm>({
    username: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Partial<LoginForm>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'CPF é obrigatório';
    } else if (!validateCPF(formData.username)) {
      newErrors.username = 'CPF inválido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await login(formData.username.replace(/\D/g, ''), formData.password);
      navigate('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao fazer login';
      showError(message);
    }
  };

  const handleChange = (field: keyof LoginForm) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">PeopleHub</h1>
          <p className="login-subtitle">Entre na sua conta</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="CPF"
            type="text"
            placeholder="000.000.000-00"
            value={formData.username}
            onChange={handleChange('username')}
            error={errors.username}
            required
            maxLength={14}
          />
          
          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
            required
          />
          
          <Button
            type="submit"
            loading={loading}
            fullWidth
            className="login-button"
          >
            Entrar
          </Button>
        </form>
        
        <div className="login-footer">
          <p>
            Não tem uma conta?{' '}
            <Link to="/register" className="login-link">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
