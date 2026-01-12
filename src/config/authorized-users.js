// Lista de emails autorizados a acessar o sistema
export const EMAILS_AUTORIZADOS = [
  "magnofmbf@gmail.com", // Substitua pelo seu email do Google
  // Adicione mais emails aqui se necessário
  // 'outro-email@gmail.com',
];

// Verifica se um email está autorizado
export const isEmailAutorizado = (email) => {
  return EMAILS_AUTORIZADOS.includes(email?.toLowerCase());
};
