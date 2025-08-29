import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components/common';
import { useToast } from '../../hooks';
import { validateCPF, validateEmail } from '../../utils/helpers';
import { apiService } from '../../services/api';
import type { RegisterForm } from '../../types';
import './Register.css';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  
  const [formData, setFormData] = useState<RegisterForm>({
    nome: '',
    sexo: undefined,
    email: '',
    dataNascimento: '',
    naturalidade: '',
    nacionalidade: '',
    cpf: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Partial<RegisterForm>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterForm> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.length > 200) {
      newErrors.nome = 'Nome deve ter no máximo 200 caracteres';
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.dataNascimento) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    }

    if (formData.naturalidade && formData.naturalidade.length > 100) {
      newErrors.naturalidade = 'Naturalidade deve ter no máximo 100 caracteres';
    }

    if (formData.nacionalidade && formData.nacionalidade.length > 100) {
      newErrors.nacionalidade = 'Nacionalidade deve ter no máximo 100 caracteres';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    } else if (formData.password.length > 100) {
      newErrors.password = 'Senha deve ter no máximo 100 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const dataToSend = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ''),
        email: formData.email || undefined,
        naturalidade: formData.naturalidade || undefined,
        nacionalidade: formData.nacionalidade || undefined,
      };

      await apiService.register(dataToSend);
      showSuccess('Conta criada com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao criar conta';
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof RegisterForm) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'sexo' ? (value as 'M' | 'F') : value,
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
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title">PeopleHub</h1>
          <p className="register-subtitle">Criar nova conta</p>
        </div>
        
        <form onSubmit={handleSubmit} className="register-form">
          <Input
            label="Nome completo"
            type="text"
            placeholder="Digite seu nome completo"
            value={formData.nome}
            onChange={handleChange('nome')}
            error={errors.nome}
            required
            maxLength={200}
          />

          <div className="form-row">
            <div className="form-col">
              <label className="label">
                Sexo
              </label>
              <select
                className="input"
                value={formData.sexo || ''}
                onChange={(e) => handleChange('sexo')(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
            
            <div className="form-col">
              <Input
                label="Data de nascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={handleChange('dataNascimento')}
                error={errors.dataNascimento}
                required
              />
            </div>
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email || ''}
            onChange={handleChange('email')}
            error={errors.email}
          />

          <div className="form-row">
            <div className="form-col">
              <Input
                label="Naturalidade"
                type="text"
                placeholder="Cidade onde nasceu"
                value={formData.naturalidade || ''}
                onChange={handleChange('naturalidade')}
                error={errors.naturalidade}
                maxLength={100}
              />
            </div>
            
            <div className="form-col">
              <Input
                label="Nacionalidade"
                type="text"
                placeholder="Ex: Brasileira"
                value={formData.nacionalidade || ''}
                onChange={handleChange('nacionalidade')}
                error={errors.nacionalidade}
                maxLength={100}
              />
            </div>
          </div>

          <Input
            label="CPF"
            type="text"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={handleChange('cpf')}
            error={errors.cpf}
            required
            maxLength={14}
          />
          
          <Input
            label="Senha"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
            required
          />
          
          <Button
            type="submit"
            loading={loading}
            fullWidth
            className="register-button"
          >
            Criar conta
          </Button>
        </form>
        
        <div className="register-footer">
          <p>
            Já tem uma conta?{' '}
            <Link to="/login" className="register-link">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
