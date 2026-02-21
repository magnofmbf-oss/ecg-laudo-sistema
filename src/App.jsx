import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import Header from "./components/Header";
import DadosPaciente from "./components/DadosPaciente";
import DadosMedico from "./components/DadosMedico";
import MedidasECG from "./components/MedidasECG";
import Conclusoes from "./components/Conclusoes";
import UploadImagem from "./components/UploadImagem";
import CaliperModal from "./components/CaliperModal";
import { gerarPDF } from "./utils/pdfGenerator";
import { calcularIdade } from "./utils/formatters";

const App = () => {
  const { user, loading } = useAuth();

  const [dadosPaciente, setDadosPaciente] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    idade: "",
  });

  const [dadosMedico, setDadosMedico] = useState({
    nome: "Dr. Magno Fernandes Mendes Borges Filho",
    especialidade: "Médico Cardiologista",
    crm: "CRM MG 59040",
    rqe: "RQE 42417",
  });

  const [medidas, setMedidas] = useState({
    fc: "",
    pr: "",
    qrs: "",
    qt: "",
    qtc: "",
    d1: "",
    avf: "",
    eixo: "",
  });

  const [conclusoes, setConclusoes] = useState([]);
  const [imagem, setImagem] = useState(null);
  const [exportando, setExportando] = useState(false);
  const [isCaliperOpen, setIsCaliperOpen] = useState(false);

  const handleApplyMeasures = (newMeasures) => {
    setMedidas((prev) => ({
      ...prev,
      ...newMeasures,
    }));
  };

  const validarFormulario = () => {
    if (!dadosPaciente.nome.trim()) {
      alert("O nome do paciente é obrigatório.");
      return false;
    }
    if (conclusoes.length === 0) {
      alert("Adicione pelo menos uma conclusão ao laudo.");
      return false;
    }
    return true;
  };

  const exportarPDF = async () => {
    if (!validarFormulario()) return;

    setExportando(true);

    try {
      await gerarPDF(dadosPaciente, dadosMedico, medidas, conclusoes, imagem);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar o PDF. Por favor, tente novamente.");
    }

    setExportando(false);
  };

  const limparFormulario = () => {
    if (window.confirm("Deseja limpar todos os campos?")) {
      setDadosPaciente({ nome: "", cpf: "", dataNascimento: "", idade: "" });
      setMedidas({
        fc: "",
        pr: "",
        qrs: "",
        qt: "",
        qtc: "",
        d1: "",
        avf: "",
        eixo: "",
      });
      setConclusoes([]);
      setImagem(null);
    }
  };

  const handleExtractData = React.useCallback((dados) => {
    setDadosPaciente((prev) => {
      const novaDataNascimento = dados.dataNascimento || prev.dataNascimento;

      // Se a IA não retornou a idade, mas retornou a data de nascimento, calculamos a idade
      let novaIdade = dados.idade || prev.idade;
      if (!dados.idade && novaDataNascimento) {
        novaIdade = calcularIdade(novaDataNascimento).toString();
      }

      return {
        ...prev,
        nome: dados.nome || prev.nome,
        cpf: dados.cpf || prev.cpf,
        dataNascimento: novaDataNascimento,
        idade: novaIdade,
      };
    });
  }, []);

  // Tela de carregamento
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  // Tela de login se não autenticado
  if (!user) {
    return <Login />;
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="form-container">
          <DadosPaciente dados={dadosPaciente} setDados={setDadosPaciente} />
          <DadosMedico dados={dadosMedico} setDados={setDadosMedico} />
          <MedidasECG medidas={medidas} setMedidas={setMedidas} />
          <Conclusoes conclusoes={conclusoes} setConclusoes={setConclusoes} />

          <div className="action-buttons" style={{ marginBottom: "24px" }}>
            <button className="btn-secondary" onClick={limparFormulario}>
              Limpar
            </button>
            <button
              className="btn-primary"
              onClick={exportarPDF}
              disabled={exportando}
            >
              {exportando ? "Gerando..." : "Exportar PDF"}
            </button>
          </div>

          <UploadImagem
            imagem={imagem}
            setImagem={setImagem}
            onOpenCaliper={() => setIsCaliperOpen(true)}
            onExtractData={handleExtractData}
          />
        </div>
      </main>

      <CaliperModal
        isOpen={isCaliperOpen}
        onClose={() => setIsCaliperOpen(false)}
        imagem={imagem}
        onApplyMeasures={handleApplyMeasures}
      />
    </div>
  );
};

export default App;
