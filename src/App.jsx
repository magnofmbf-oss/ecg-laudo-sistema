import React, { useState } from 'react';
import Header from './components/Header';
import DadosPaciente from './components/DadosPaciente';
import DadosMedico from './components/DadosMedico';
import MedidasECG from './components/MedidasECG';
import Conclusoes from './components/Conclusoes';
import UploadImagem from './components/UploadImagem';
import { gerarPDF } from './utils/pdfGenerator';

const App = () => {
  const [dadosPaciente, setDadosPaciente] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    idade: ''
  });

  const [dadosMedico, setDadosMedico] = useState({
    nome: 'Dr. Magno Fernandes Mendes Borges Filho',
    especialidade: 'Médico Cardiologista',
    crm: 'CRM MG 59040',
    rqe: 'RQE 42417'
  });

  const [medidas, setMedidas] = useState({
    fc: '',
    pr: '',
    qrs: '',
    qt: '',
    qtc: '',
    d1: '',
    avf: '',
    eixo: ''
  });

  const [conclusoes, setConclusoes] = useState([]);
  const [imagem, setImagem] = useState(null);
  const [exportando, setExportando] = useState(false);

  const validarFormulario = () => {
    if (!dadosPaciente.nome.trim()) {
      alert('O nome do paciente é obrigatório.');
      return false;
    }
    if (conclusoes.length === 0) {
      alert('Adicione pelo menos uma conclusão ao laudo.');
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
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar o PDF. Por favor, tente novamente.');
    }
    
    setExportando(false);
  };

  const limparFormulario = () => {
    if (window.confirm('Deseja limpar todos os campos?')) {
      setDadosPaciente({ nome: '', cpf: '', dataNascimento: '', idade: '' });
      setMedidas({ fc: '', pr: '', qrs: '', qt: '', qtc: '', d1: '', avf: '', eixo: '' });
      setConclusoes([]);
      setImagem(null);
    }
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="form-container">
          <DadosPaciente dados={dadosPaciente} setDados={setDadosPaciente} />
          <DadosMedico dados={dadosMedico} setDados={setDadosMedico} />
          <MedidasECG medidas={medidas} setMedidas={setMedidas} />
          <Conclusoes conclusoes={conclusoes} setConclusoes={setConclusoes} />
          <UploadImagem imagem={imagem} setImagem={setImagem} />
          
          <div className="action-buttons">
            <button className="btn-secondary" onClick={limparFormulario}>
              Limpar
            </button>
            <button 
              className="btn-primary" 
              onClick={exportarPDF}
              disabled={exportando}
            >
              {exportando ? 'Gerando.. .' : 'Exportar PDF'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;