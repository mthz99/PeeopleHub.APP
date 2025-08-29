import React, { useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common';
import './Header.css';

interface HeaderProps {
  onAddPerson?: () => void;
  onSearch?: (query: string) => void;
  searchValue?: string;
}

export const Header: React.FC<HeaderProps> = React.memo(({
  onAddPerson,
  onSearch,
  searchValue = ''
}) => {
  const { logout, username, nome } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  }, [onSearch]);

  // Use nome se disponível, senão use username
  const displayName = nome || username;

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo">PeopleHub</h1>
        </div>
        
        <div className="header-center">
          {onSearch && (
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar pessoas..."
                value={searchValue}
                onChange={handleSearchChange}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          )}
        </div>
        
        <div className="header-right">
          {onAddPerson && (
            <Button onClick={onAddPerson} size="small">
              ➕ Adicionar Pessoa
            </Button>
          )}
          
          <div className="user-menu">
            <span className="username">{displayName}</span>
            <Button onClick={handleLogout} variant="outline" size="small">
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
});
