import React from "react";
import { User } from "lucide-react";
import InputField from "./shared/InputField";
import { calcularIdade, formatarCPF } from "../utils/formatters";

const DadosPaciente = ({ dados, setDados }) => {
  return (
    <section className="card">
      <h2 className="card-title">
        <span className="icon">
          <User size={20} />
        </span>
        Dados do Paciente
      </h2>
      <div className="form-grid">
        <InputField
          label="Nome completo"
          value={dados.nome}
          onChange={(v) => setDados({ ...dados, nome: v.toUpperCase() })}
          placeholder="NOME DO PACIENTE"
          required
          className="span-2"
        />
        <InputField
          label="CPF"
          value={dados.cpf}
          onChange={(v) => setDados({ ...dados, cpf: formatarCPF(v) })}
          placeholder="000.000.000-00"
        />
        <div className="input-field">
          <label>Data de Nascimento</label>
          <input
            type="date"
            value={dados.dataNascimento}
            onChange={(e) => {
              const idade = calcularIdade(e.target.value);

              setDados({
                ...dados,
                dataNascimento: e.target.value,
                idade: idade.toString(),
              });
            }}
          />
        </div>
        <div className="input-field idade-field">
          <label>Idade</label>
          <div className="idade-display">
            <span>{dados.idade || "—"}</span>
            <span className="unit">anos</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DadosPaciente;
