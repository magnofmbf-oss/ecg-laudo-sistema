import React, { useState, useEffect } from "react";
import { Activity, Info, Square } from "lucide-react";
import DualMeasureField from "./shared/DualMeasureField";
import {
  calcularFC,
  calcularQuadradosFC,
  calcularIntervalo,
  calcularQuadradosIntervalo,
  calcularQTc,
  calcularEixo,
} from "../utils/formatters";

const MedidasECG = ({ medidas, setMedidas }) => {
  const [quadrados, setQuadrados] = useState({
    fc: "",
    pr: "",
    qrs: "",
    qt: "",
    d1: "",
    avf: "",
  });

  // Limpar quadrados quando as medidas forem zeradas
  useEffect(() => {
    const todasVazias = Object.values(medidas).every((v) => v === "");
    if (todasVazias) {
      setQuadrados({
        fc: "",
        pr: "",
        qrs: "",
        qt: "",
        d1: "",
        avf: "",
      });
    }
  }, [medidas]);

  // Calcular QTc automaticamente
  useEffect(() => {
    const qtc = calcularQTc(medidas.qt, medidas.fc);
    if (qtc !== medidas.qtc) {
      setMedidas((prev) => ({ ...prev, qtc }));
    }
  }, [medidas.qt, medidas.fc]);

  // Calcular Eixo automaticamente
  useEffect(() => {
    const eixo = calcularEixo(medidas.d1, medidas.avf);
    if (eixo !== medidas.eixo) {
      setMedidas((prev) => ({ ...prev, eixo }));
    }
  }, [medidas.d1, medidas.avf]);

  return (
    <section className="card">
      <h2 className="card-title">
        <span className="icon">
          <Activity size={20} />
        </span>
        Medidas do ECG
      </h2>
      <div className="measures-grid">
        <DualMeasureField
          label="FC"
          value={medidas.fc}
          onChange={(v) => setMedidas({ ...medidas, fc: v })}
          unit="bpm"
          quadrados={quadrados.fc}
          onQuadradosChange={(v) => setQuadrados({ ...quadrados, fc: v })}
          quadradosToValue={calcularFC}
          valueToQuadrados={calcularQuadradosFC}
          isFC={true}
        />
        <DualMeasureField
          label="PRi"
          value={medidas.pr}
          onChange={(v) => setMedidas({ ...medidas, pr: v })}
          unit="ms"
          quadrados={quadrados.pr}
          onQuadradosChange={(v) => setQuadrados({ ...quadrados, pr: v })}
          quadradosToValue={calcularIntervalo}
          valueToQuadrados={calcularQuadradosIntervalo}
        />
        <DualMeasureField
          label="QRS"
          value={medidas.qrs}
          onChange={(v) => setMedidas({ ...medidas, qrs: v })}
          unit="ms"
          quadrados={quadrados.qrs}
          onQuadradosChange={(v) => setQuadrados({ ...quadrados, qrs: v })}
          quadradosToValue={calcularIntervalo}
          valueToQuadrados={calcularQuadradosIntervalo}
        />
        <DualMeasureField
          label="QT"
          value={medidas.qt}
          onChange={(v) => setMedidas({ ...medidas, qt: v })}
          unit="ms"
          quadrados={quadrados.qt}
          onQuadradosChange={(v) => setQuadrados({ ...quadrados, qt: v })}
          quadradosToValue={calcularIntervalo}
          valueToQuadrados={calcularQuadradosIntervalo}
        />
        <div className="measure-field calculated-field">
          <label>
            QTc <span className="calc-badge">Bazett</span>
          </label>
          <div className="measure-input-group">
            <input
              type="text"
              value={medidas.qtc}
              readOnly
              className="calculated"
              placeholder="Auto"
            />
            <span className="unit-label">ms</span>
          </div>
        </div>

        {/* CAMPOS D1 e aVF com quadrados */}
        <DualMeasureField
          label="D1"
          value={medidas.d1}
          onChange={(v) => setMedidas({ ...medidas, d1: v })}
          unit="mV"
          quadrados={quadrados.d1}
          onQuadradosChange={(v) => setQuadrados({ ...quadrados, d1: v })}
          quadradosToValue={(q) => (q ? parseFloat(q) : null)}
          valueToQuadrados={(v) => (v ? parseFloat(v) : null)}
        />

        <DualMeasureField
          label="aVF"
          value={medidas.avf}
          onChange={(v) => setMedidas({ ...medidas, avf: v })}
          unit="mV"
          quadrados={quadrados.avf}
          onQuadradosChange={(v) => setQuadrados({ ...quadrados, avf: v })}
          quadradosToValue={(q) => (q ? parseFloat(q) : null)}
          valueToQuadrados={(v) => (v ? parseFloat(v) : null)}
        />

        {/* EIXO CALCULADO AUTOMATICAMENTE */}
        <div className="measure-field calculated-field">
          <label>
            Eixo <span className="calc-badge">Auto</span>
          </label>
          <div className="measure-input-group">
            <input
              type="text"
              value={medidas.eixo}
              readOnly
              className="calculated"
              placeholder="Auto"
            />
            <span className="unit-label">°</span>
          </div>
        </div>
      </div>
      <div className="calc-info">
        <span className="info-icon">
          <Info size={16} />
        </span>
        <span>
          Preencha em quadrados (
          <Square
            size={12}
            style={{ display: "inline", verticalAlign: "middle" }}
          />
          ) ou em unidade - a conversão é automática. FC = 1500/
          <Square
            size={12}
            style={{ display: "inline", verticalAlign: "middle" }}
          />
          . Intervalos ={" "}
          <Square
            size={12}
            style={{ display: "inline", verticalAlign: "middle" }}
          />{" "}
          × 40ms. Eixo calculado via D1 e aVF.
        </span>
      </div>
    </section>
  );
};

export default MedidasECG;
