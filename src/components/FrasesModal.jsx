import React, { useState, useMemo } from 'react';
import { frasesDatabase } from '../data/frasesDatabase';

const FrasesModal = ({ isOpen, onClose, onSelect }) => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('ritmo');
  const [textoLivre, setTextoLivre] = useState('');
  const [modoTextoLivre, setModoTextoLivre] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');

  if (!isOpen) return null;

  const handleSelectFrase = (frase) => {
    onSelect(frase);
    onClose();
  };

  const handleTextoLivre = () => {
    if (textoLivre.trim()) {
      onSelect(textoLivre. trim());
      setTextoLivre('');
      setModoTextoLivre(false);
      onClose();
    }
  };

  // Buscar em TODAS as categorias ou apenas na ativa
  const frasesFiltradas = useMemo(() => {
    if (termoBusca. trim() === '') {
      // Sem busca: mostrar apenas da categoria ativa
      return frasesDatabase[categoriaAtiva].frases.map((frase) => ({
        frase,
        categoria: frasesDatabase[categoriaAtiva].titulo
      }));
    }

    // Com busca: buscar em TODAS as categorias
    const resultado = [];
    Object.entries(frasesDatabase). forEach(([key, categoria]) => {
      categoria.frases.forEach((frase) => {
        if (frase.toLowerCase().includes(termoBusca.toLowerCase())) {
          resultado.push({
            frase,
            categoria: categoria. titulo
          });
        }
      });
    });
    return resultado;
  }, [termoBusca, categoriaAtiva]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Adicionar Conclusão</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {/* CAMPO DE BUSCA GLOBAL */}
        <div className="busca-global-container">
          <input
            type="text"
            className="busca-input"
            placeholder="🔍 Buscar em todas as frases..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          {termoBusca && (
            <button 
              className="busca-limpar"
              onClick={() => setTermoBusca('')}
              title="Limpar busca"
            >
              ×
            </button>
          )}
        </div>
        
        <div className="modal-tabs">
          <button 
            className={! modoTextoLivre ?  'active' : ''}
            onClick={() => {
              setModoTextoLivre(false);
              setTermoBusca('');
            }}
          >
            Frases Prontas
          </button>
          <button 
            className={modoTextoLivre ? 'active' : ''}
            onClick={() => {
              setModoTextoLivre(true);
              setTermoBusca('');
            }}
          >
            Texto Livre
          </button>
        </div>

        {modoTextoLivre ?  (
          <div className="texto-livre-container">
            <textarea
              value={textoLivre}
              onChange={(e) => setTextoLivre(e.target.value)}
              placeholder="Digite sua conclusão personalizada..."
              rows={4}
            />
            <button className="btn-adicionar-texto" onClick={handleTextoLivre}>
              Adicionar
            </button>
          </div>
        ) : (
          <div className="frases-container">
            {/* Sidebar só aparece quando NÃO está buscando */}
            {! termoBusca && (
              <div className="categorias-sidebar">
                {Object.entries(frasesDatabase).map(([key, categoria]) => (
                  <button
                    key={key}
                    className={categoriaAtiva === key ? 'active' : ''}
                    onClick={() => setCategoriaAtiva(key)}
                  >
                    {categoria. titulo}
                  </button>
                ))}
              </div>
            )}

            <div className={`frases-lista ${termoBusca ? 'busca-ativa' : ''}`}>
              {frasesFiltradas.length > 0 ? (
                frasesFiltradas. map((item, idx) => (
                  <button
                    key={idx}
                    className="frase-item"
                    onClick={() => handleSelectFrase(item.frase)}
                  >
                    {termoBusca && (
                      <span className="frase-categoria">{item.categoria}</span>
                    )}
                    <span className="frase-texto">{item.frase}</span>
                  </button>
                ))
              ) : (
                <div className="sem-resultados">
                  <span className="sem-resultados-icone">🔍</span>
                  <p>Nenhuma frase encontrada para <strong>"{termoBusca}"</strong></p>
                  <small>Tente buscar com outras palavras</small>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrasesModal;