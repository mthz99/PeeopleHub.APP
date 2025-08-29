import React from 'react';
import { Avatar, Button } from './common';
import { formatCPF, formatDate } from '../utils/helpers';
import type { Person } from '../types';
import './PersonCard.css';

interface PersonCardProps {
  person: Person;
  onEdit: (person: Person) => void;
  onDelete: (person: Person) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  person,
  onEdit,
  onDelete,
}) => {
  const handleEdit = () => {
    onEdit(person);
  };

  const handleDelete = () => {
    onDelete(person);
  };

  return (
    <div className="person-card">
      <div className="person-card-header">
        <Avatar name={person.nome} size="large" />
        <div className="person-info">
          <h3 className="person-name">{person.nome}</h3>
          <p className="person-cpf">{formatCPF(person.cpf)}</p>
          {person.email && (
            <p className="person-email">{person.email}</p>
          )}
        </div>
      </div>
      
      <div className="person-details">
        <div className="detail-item">
          <span className="detail-label">Data de nascimento:</span>
          <span className="detail-value">{formatDate(person.dataNascimento)}</span>
        </div>
        
        {person.sexo && (
          <div className="detail-item">
            <span className="detail-label">Sexo:</span>
            <span className="detail-value">{person.sexo === 'M' ? 'Masculino' : 'Feminino'}</span>
          </div>
        )}
        
        {person.naturalidade && (
          <div className="detail-item">
            <span className="detail-label">Naturalidade:</span>
            <span className="detail-value">{person.naturalidade}</span>
          </div>
        )}
        
        {person.nacionalidade && (
          <div className="detail-item">
            <span className="detail-label">Nacionalidade:</span>
            <span className="detail-value">{person.nacionalidade}</span>
          </div>
        )}
      </div>
      
      <div className="person-actions">
        <Button
          variant="outline"
          size="small"
          onClick={handleEdit}
        >
          ✏️ Editar
        </Button>
        
        <Button
          variant="danger"
          size="small"
          onClick={handleDelete}
        >
          🗑️ Excluir
        </Button>
      </div>
    </div>
  );
};
