import { frasesDatabase, categoriasOrdenadas } from "../data/frasesDatabase";
import React, { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const FrasesModal = ({ isOpen, onClose, onSelect }) => {
  const { user } = useAuth();
  const [categoriaAtiva, setCategoriaAtiva] = useState("normalidade");
  const [textoLivre, setTextoLivre] = useState("");
  const [modoTextoLivre, setModoTextoLivre] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const [frasesPersonalizadas, setFrasesPersonalizadas] = useState([]);
  const [frasesSelecionadas, setFrasesSelecionadas] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Limpar frases selecionadas ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      setFrasesSelecionadas([]);
      setTermoBusca("");
      setModoTextoLivre(false);
    }
  }, [isOpen]);

  // Carregar frases personalizadas do Firestore
  useEffect(() => {
    const carregarFrases = async () => {
      // Primeiro tenta carregar do localStorage
      const frasesSalvas = localStorage.getItem("frasesPersonalizadas");
      if (frasesSalvas) {
        setFrasesPersonalizadas(JSON.parse(frasesSalvas));
      }

      // Se houver usuário, tenta sincronizar com Firestore
      if (!user) return;

      try {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const frasesFirestore = data.frasesPersonalizadas || [];
          setFrasesPersonalizadas(frasesFirestore);
          // Atualiza localStorage com dados do Firestore
          localStorage.setItem(
            "frasesPersonalizadas",
            JSON.stringify(frasesFirestore),
          );
        }
      } catch (error) {
        // Continua usando localStorage se Firestore falhar
      }
    };

    carregarFrases();
  }, [user]);

  // Criar banco de dados dinâmico incluindo frases personalizadas
  const frasesCompletas = useMemo(() => {
    return {
      ...frasesDatabase,
      personalizado: {
        ...frasesDatabase.personalizado,
        frases: frasesPersonalizadas,
      },
    };
  }, [frasesPersonalizadas]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      const buscaInput = document.querySelector(".busca-input");
      if (buscaInput) buscaInput.focus();
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Buscar em TODAS as categorias ou apenas na ativa
  const frasesFiltradas = useMemo(() => {
    if (termoBusca.trim() === "") {
      // Sem busca: mostrar apenas da categoria ativa
      return frasesCompletas[categoriaAtiva].frases.map((frase) => ({
        frase,
        categoria: frasesCompletas[categoriaAtiva].titulo,
      }));
    }

    // Com busca: buscar em TODAS as categorias
    const resultado = [];
    Object.entries(frasesCompletas).forEach(([key, categoria]) => {
      categoria.frases.forEach((frase) => {
        if (frase.toLowerCase().includes(termoBusca.toLowerCase())) {
          resultado.push({
            frase,
            categoria: categoria.titulo,
          });
        }
      });
    });
    return resultado;
  }, [termoBusca, categoriaAtiva, frasesCompletas]);

  // AGORA o return condicional vem DEPOIS de todos os hooks
  if (!isOpen) return null;

  const handleSelectFrase = (frase) => {
    setFrasesSelecionadas([...frasesSelecionadas, frase]);
  };

  const handleRemoverFrase = (index) => {
    const novasFrases = [...frasesSelecionadas];
    novasFrases.splice(index, 1);
    setFrasesSelecionadas(novasFrases);
  };

  const handleConcluir = () => {
    if (frasesSelecionadas.length > 0) {
      // Em vez de juntar tudo em uma string, passamos o array de frases
      onSelect(frasesSelecionadas);
    }
    onClose();
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedIdx = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (isNaN(draggedIdx) || draggedIdx === index) return;

    const novasFrases = [...frasesSelecionadas];
    const draggedFrase = novasFrases[draggedIdx];

    novasFrases.splice(draggedIdx, 1);
    novasFrases.splice(index, 0, draggedFrase);

    setFrasesSelecionadas(novasFrases);
    setDraggedIndex(null);
  };

  const handleTextoLivre = async () => {
    if (textoLivre.trim()) {
      const novaFrase = textoLivre.trim();

      // Adicionar à lista de frases selecionadas
      setFrasesSelecionadas([...frasesSelecionadas, novaFrase]);

      // Salvar na categoria Personalizado se não existir
      if (!frasesPersonalizadas.includes(novaFrase)) {
        const novasFrases = [...frasesPersonalizadas, novaFrase];
        setFrasesPersonalizadas(novasFrases);

        // Sempre salva no localStorage
        localStorage.setItem(
          "frasesPersonalizadas",
          JSON.stringify(novasFrases),
        );

        // Tenta salvar no Firestore (opcional)
        if (user) {
          try {
            const docRef = doc(db, "usuarios", user.uid);
            await setDoc(
              docRef,
              {
                frasesPersonalizadas: novasFrases,
                ultimaAtualizacao: new Date(),
              },
              { merge: true },
            );
          } catch (error) {
            // Continua funcionando com localStorage se Firestore falhar
          }
        }
      }

      setTextoLivre("");
      setModoTextoLivre(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content modal-content-wide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-body-split">
          {/* PAINEL ESQUERDO - BUSCA E SELEÇÃO */}
          <div className="modal-left-panel">
            <div className="modal-header">
              <h3>Adicionar Conclusão</h3>
            </div>

            {/* CAMPO DE BUSCA GLOBAL */}
            <div className="busca-global-container">
              <Search size={18} className="busca-icon" />
              <input
                type="text"
                className="busca-input"
                placeholder="Buscar em todas as frases..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
              />
              {termoBusca && (
                <button
                  className="busca-limpar"
                  onClick={() => setTermoBusca("")}
                  title="Limpar busca"
                >
                  ×
                </button>
              )}
            </div>

            <div className="modal-tabs">
              <button
                className={!modoTextoLivre ? "active" : ""}
                onClick={() => {
                  setModoTextoLivre(false);
                  setTermoBusca("");
                }}
              >
                Frases Prontas
              </button>
              <button
                className={modoTextoLivre ? "active" : ""}
                onClick={() => {
                  setModoTextoLivre(true);
                  setTermoBusca("");
                }}
              >
                Texto Livre
              </button>
            </div>

            {modoTextoLivre ? (
              <div className="texto-livre-container">
                <textarea
                  value={textoLivre}
                  onChange={(e) => setTextoLivre(e.target.value)}
                  placeholder="Digite sua conclusão personalizada..."
                  rows={4}
                />
                <button
                  className="btn-adicionar-texto"
                  onClick={handleTextoLivre}
                >
                  Adicionar
                </button>
              </div>
            ) : (
              <div className="frases-container">
                {/* Sidebar só aparece quando NÃO está buscando */}
                {!termoBusca && (
                  <div className="categorias-sidebar">
                    {categoriasOrdenadas.map((key) => (
                      <button
                        key={key}
                        className={categoriaAtiva === key ? "active" : ""}
                        onClick={() => setCategoriaAtiva(key)}
                      >
                        {frasesDatabase[key].titulo}
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`frases-lista ${termoBusca ? "busca-ativa" : ""}`}
                >
                  {frasesFiltradas.length > 0 ? (
                    frasesFiltradas.map((item, idx) => (
                      <button
                        key={idx}
                        className="frase-item"
                        onClick={() => handleSelectFrase(item.frase)}
                      >
                        {termoBusca && (
                          <span className="frase-categoria">
                            {item.categoria}
                          </span>
                        )}
                        <span className="frase-texto">{item.frase}</span>
                      </button>
                    ))
                  ) : (
                    <div className="sem-resultados">
                      <span className="sem-resultados-icone">
                        <Search size={48} />
                      </span>
                      <p>
                        Nenhuma frase encontrada para{" "}
                        <strong>"{termoBusca}"</strong>
                      </p>
                      <small>Tente buscar com outras palavras</small>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* PAINEL DIREITO - FRASES SELECIONADAS */}
          <div className="modal-right-panel">
            <div className="modal-header">
              <h3>Laudo em Construção</h3>
              <button className="modal-close" onClick={onClose}>
                ×
              </button>
            </div>

            <div className="frases-selecionadas-lista">
              {frasesSelecionadas.length === 0 ? (
                <div className="empty-state-selecionadas">
                  <p>Nenhuma frase selecionada.</p>
                  <small>
                    Clique nas frases ao lado para adicioná-las ao laudo.
                  </small>
                </div>
              ) : (
                frasesSelecionadas.map((frase, idx) => (
                  <div
                    key={idx}
                    className={`frase-selecionada-item ${draggedIndex === idx ? "dragging" : ""}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, idx)}
                    onDragEnd={() => setDraggedIndex(null)}
                  >
                    <div className="drag-handle">⋮⋮</div>
                    <span className="frase-selecionada-texto">{frase}</span>
                    <button
                      className="btn-remover-frase"
                      onClick={() => handleRemoverFrase(idx)}
                      title="Remover frase"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn-concluir-laudo"
                onClick={handleConcluir}
                disabled={frasesSelecionadas.length === 0}
              >
                Concluir Laudo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrasesModal;
