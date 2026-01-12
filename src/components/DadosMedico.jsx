import React from "react";
import { Stethoscope } from "lucide-react";
import InputField from "./shared/InputField";

const DadosMedico = ({ dados, setDados }) => (
  <section className="card">
    <h2 className="card-title">
      <span className="icon">
        <Stethoscope size={20} />
      </span>
      Dados do Médico
    </h2>
    <div className="form-grid">
      <InputField
        label="Nome"
        value={dados.nome}
        onChange={(v) => setDados({ ...dados, nome: v })}
        placeholder="Dr(a). Nome completo"
        className="span-2"
      />
      <InputField
        label="Especialidade"
        value={dados.especialidade}
        onChange={(v) => setDados({ ...dados, especialidade: v })}
        placeholder="Cardiologista"
      />
      <InputField
        label="CRM"
        value={dados.crm}
        onChange={(v) => setDados({ ...dados, crm: v })}
        placeholder="CRM-UF 00000"
      />
      <InputField
        label="RQE"
        value={dados.rqe}
        onChange={(v) => setDados({ ...dados, rqe: v })}
        placeholder="00000"
      />
    </div>
  </section>
);

export default DadosMedico;
