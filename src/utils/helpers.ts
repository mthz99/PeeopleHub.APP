// CPF validation function
export function validateCPF(cpf: string): boolean {
  // Remove any non-numeric characters
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Check if it has 11 digits
  if (cleanCPF.length !== 11) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
  
  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
  
  return true;
}

// Format CPF for display
export function formatCPF(cpf: string): string {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Clean CPF (remove formatting)
export function cleanCPF(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

// Generate avatar from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
