import React, { useState, useEffect } from 'react';
import { Button, Input } from '../common';
import { validateCPF, validateEmail } from '../../utils/helpers';
import type { PersonForm } from '../../types';
import './PersonFormComponent.css';

interface PersonFormComponentProps {
  initialData?: Partial<PersonForm>;
  onSubmit: (data: PersonForm) => void;
  onCancel: () => void;
  loading?: boolean;
  submitText?: string;
}

export const PersonFormComponent: React.FC<PersonFormComponentProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  submitText = 'Salvar',
}) => {
  const [formData, setFormData] = useState<PersonForm>({
    nome: '',
    sexo: undefined,
    email: '',
    dataNascimento: '',
    naturalidade: '',
    nacionalidade: '',
    cpf: '',
    ...initialData,
  });
  
  const [errors, setErrors] = useState<Partial<PersonForm>>({});

  useEffect(() => {
    if (initialData) {
      // Converter data para formato correto do input date (YYYY-MM-DD)
      let formattedDate = initialData.dataNascimento || '';
      
      if (formattedDate && formattedDate.includes('T')) {
        formattedDate = formattedDate.split('T')[0]; // Remove a parte do tempo
      }
      
      setFormData({
        nome: initialData.nome || '',
        sexo: initialData.sexo,
        email: initialData.email || '',
        dataNascimento: formattedDate,
        naturalidade: initialData.naturalidade || '',
        nacionalidade: initialData.nacionalidade || '',
        cpf: initialData.cpf || '',
      });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<PersonForm> = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const dataToSubmit = {
      ...formData,
      cpf: formData.cpf.replace(/\D/g, ''),
      email: formData.email || undefined,
      naturalidade: formData.naturalidade || undefined,
      nacionalidade: formData.nacionalidade || undefined,
    };

    onSubmit(dataToSubmit);
  };

  const handleChange = (field: keyof PersonForm) => (value: string) => {
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
    <form onSubmit={handleSubmit} className="person-form">
      <Input
        label="Nome completo"
        type="text"
        placeholder="Digite o nome completo"
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
        placeholder="email@exemplo.com"
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

      <div className="form-actions">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          loading={loading}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
};
