import React, { useState } from "react";
import { FileText } from "lucide-react";
import FrasesModal from "./FrasesModal";

const Conclusoes = ({ conclusoes, setConclusoes }) => {
  const [modalAberto, setModalAberto] = useState(false);

  const adicionarConclusao = (frase) => {
    if (!conclusoes.includes(frase)) {
      setConclusoes([...conclusoes, frase]);
    }
  };

  const removerConclusao = (index) => {
    setConclusoes(conclusoes.filter((_, i) => i !== index));
  };

  const moverConclusao = (index, direcao) => {
    const novaLista = [...conclusoes];
    const novoIndex = index + direcao;
    if (novoIndex >= 0 && novoIndex < conclusoes.length) {
      [novaLista[index], novaLista[novoIndex]] = [
        novaLista[novoIndex],
        novaLista[index],
      ];
      setConclusoes(novaLista);
    }
  };

  return (
    <section className="card">
      <h2 className="card-title">
        <span className="icon">
          <FileText size={20} />
        </span>
        Conclusão
      </h2>

      <div className="conclusoes-lista">
        {conclusoes.length === 0 ? (
          <p className="empty-state">
            Nenhuma conclusão adicionada. Clique no botão abaixo para adicionar.{" "}
          </p>
        ) : (
          conclusoes.map((conclusao, idx) => (
            <div key={idx} className="conclusao-item">
              <span className="conclusao-bullet">•</span>
              <span className="conclusao-texto">{conclusao}</span>
              <div className="conclusao-actions">
                <button
                  className="btn-mover"
                  onClick={() => moverConclusao(idx, -1)}
                  disabled={idx === 0}
                  title="Mover para cima"
                >
                  ↑
                </button>
                <button
                  className="btn-mover"
                  onClick={() => moverConclusao(idx, 1)}
                  disabled={idx === conclusoes.length - 1}
                  title="Mover para baixo"
                >
                  ↓
                </button>
                <button
                  className="btn-remover"
                  onClick={() => removerConclusao(idx)}
                  title="Remover"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="btn-adicionar" onClick={() => setModalAberto(true)}>
        <span>+</span>
        Adicionar Conclusão
      </button>

      <FrasesModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSelect={adicionarConclusao}
      />
    </section>
  );
};

export default Conclusoes;
