import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from '../../components/layout';
import { Modal, Loading } from '../../components/common';
import { PersonFormComponent } from '../../components/forms';
import { PersonCard } from '../../components/PersonCard';
import { useToast } from '../../hooks';
import { apiService } from '../../services/api';
import type { Person, PersonForm, GridControls } from '../../types';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { showSuccess, showError } = useToast();
  
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Person | null>(null);
  
  const [gridControls, setGridControls] = useState<GridControls>({
    search: '',
    pageSize: 25,
    currentPage: 1,
  });

  // Filter people based on search (APENAS LOCAL - SEM API)
  const filteredPeople = useMemo(() => {
    if (!gridControls.search) return people;
    
    const searchLower = gridControls.search.toLowerCase();
    return people.filter(person =>
      person.nome.toLowerCase().includes(searchLower) ||
      person.cpf.includes(searchLower) ||
      person.email?.toLowerCase().includes(searchLower)
    );
  }, [people, gridControls.search]);

  // Paginated people
  const paginatedPeople = useMemo(() => {
    const startIndex = (gridControls.currentPage - 1) * gridControls.pageSize;
    const endIndex = startIndex + gridControls.pageSize;
    return filteredPeople.slice(startIndex, endIndex);
  }, [filteredPeople, gridControls.currentPage, gridControls.pageSize]);

  const totalPages = Math.ceil(filteredPeople.length / gridControls.pageSize);

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPeople();
      setPeople(data);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao carregar pessoas';
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await apiService.deletePerson(deleteConfirm.id);
      setPeople(prev => prev.filter(p => p.id !== deleteConfirm.id));
      showSuccess('Pessoa excluída com sucesso!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao excluir pessoa';
      showError(message);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleFormSubmit = async (formData: PersonForm) => {
    try {
      setFormLoading(true);
      
      if (editingPerson) {
        // Update existing person
        const updatedPerson = await apiService.updatePerson(editingPerson.id, formData);
        setPeople(prev => prev.map(p => p.id === editingPerson.id ? updatedPerson : p));
        showSuccess('Pessoa atualizada com sucesso!');
      } else {
        // Create new person
        const newPerson = await apiService.createPerson(formData);
        setPeople(prev => [newPerson, ...prev]);
        showSuccess('Pessoa adicionada com sucesso!');
      }
      
      setModalOpen(false);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao salvar pessoa';
      showError(message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleSearch = useCallback((query: string) => {
    setGridControls(prev => ({
      ...prev,
      search: query,
      currentPage: 1,
    }));
  }, []);

  const handleAddPerson = useCallback(() => {
    setEditingPerson(null);
    setModalOpen(true);
  }, []);

  const handleEditPerson = useCallback((person: Person) => {
    setEditingPerson(person);
    setModalOpen(true);
  }, []);

  const handleDeletePerson = useCallback((person: Person) => {
    setDeleteConfirm(person);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setGridControls(prev => ({
      ...prev,
      pageSize: size,
      currentPage: 1,
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setGridControls(prev => ({
      ...prev,
      currentPage: page,
    }));
  }, []);

  if (loading) {
    return <Loading fullScreen text="Carregando pessoas..." />;
  }

  return (
    <div className="dashboard">
      <Header
        onAddPerson={handleAddPerson}
        onSearch={handleSearch}
        searchValue={gridControls.search}
      />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h2>Pessoas ({filteredPeople.length})</h2>
          </div>
          
          <div className="dashboard-controls">
            <label>
              Itens por página:
              <select
                value={gridControls.pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="page-size-select"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </label>
          </div>
        </div>

        {filteredPeople.length === 0 ? (
          <div className="empty-state">
            <p>
              {gridControls.search
                ? 'Nenhuma pessoa encontrada para a busca.'
                : 'Nenhuma pessoa cadastrada ainda.'}
            </p>
          </div>
        ) : (
          <>
            <div className="people-grid">
              {paginatedPeople.map(person => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onEdit={handleEditPerson}
                  onDelete={handleDeletePerson}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(gridControls.currentPage - 1)}
                  disabled={gridControls.currentPage === 1}
                  className="pagination-btn"
                >
                  Anterior
                </button>
                
                <span className="pagination-info">
                  Página {gridControls.currentPage} de {totalPages}
                </span>
                
                <button
                  onClick={() => handlePageChange(gridControls.currentPage + 1)}
                  disabled={gridControls.currentPage === totalPages}
                  className="pagination-btn"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add/Edit Person Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPerson ? 'Editar Pessoa' : 'Adicionar Pessoa'}
        size="large"
      >
        <PersonFormComponent
          initialData={editingPerson || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setModalOpen(false)}
          loading={formLoading}
          submitText={editingPerson ? 'Atualizar' : 'Adicionar'}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Confirmar Exclusão"
        size="small"
      >
        <div className="delete-confirm">
          <p>Tem certeza que deseja excluir <strong>{deleteConfirm?.nome}</strong>?</p>
          <p className="delete-warning">Esta ação não pode ser desfeita.</p>
          
          <div className="delete-actions">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="btn btn-outline"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="btn btn-danger"
            >
              Excluir
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
