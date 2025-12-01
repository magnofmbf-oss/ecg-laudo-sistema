import React, { useState, useEffect } from "react";
import MeasureField from "./shared/MeasureField";
import {
  calcularFC,
  calcularIntervalo,
  calcularQTc,
  calcularEixo,
} from "../utils/formatters";

const MedidasECG = ({ medidas, setMedidas }) => {
  const [modoCalculo, setModoCalculo] = useState({
    fc: false,
    pr: false,
    qrs: false,
    qt: false,
  });

  const [quadrados, setQuadrados] = useState({
    fc: "",
    pr: "",
    qrs: "",
    qt: "",
  });

  const handleCalcularFC = (q) => {
    const fc = calcularFC(q);
    if (fc) {
      setMedidas((prev) => ({ ...prev, fc: fc.toString() }));
    }
  };

  const handleCalcularIntervalo = (q, campo) => {
    const ms = calcularIntervalo(q);
    if (ms) {
      setMedidas((prev) => ({ ...prev, [campo]: ms.toString() }));
    }
  };

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
        <span className="icon">📊</span>
        Medidas do ECG
      </h2>
      <div className="measures-grid">
        <MeasureField
          label="FC"
          value={medidas.fc}
          onChange={(v) => setMedidas({ ...medidas, fc: v })}
          unit="bpm"
          onCalculate={handleCalcularFC}
          calculationMode={modoCalculo.fc}
          setCalculationMode={(v) => setModoCalculo({ ...modoCalculo, fc: v })}
          quadrados={quadrados.fc}
          setQuadrados={(v) => setQuadrados({ ...quadrados, fc: v })}
        />
        <MeasureField
          label="PR"
          value={medidas.pr}
          onChange={(v) => setMedidas({ ...medidas, pr: v })}
          unit="ms"
          onCalculate={(q) => handleCalcularIntervalo(q, "pr")}
          calculationMode={modoCalculo.pr}
          setCalculationMode={(v) => setModoCalculo({ ...modoCalculo, pr: v })}
          quadrados={quadrados.pr}
          setQuadrados={(v) => setQuadrados({ ...quadrados, pr: v })}
        />
        <MeasureField
          label="QRS"
          value={medidas.qrs}
          onChange={(v) => setMedidas({ ...medidas, qrs: v })}
          unit="ms"
          onCalculate={(q) => handleCalcularIntervalo(q, "qrs")}
          calculationMode={modoCalculo.qrs}
          setCalculationMode={(v) => setModoCalculo({ ...modoCalculo, qrs: v })}
          quadrados={quadrados.qrs}
          setQuadrados={(v) => setQuadrados({ ...quadrados, qrs: v })}
        />
        <MeasureField
          label="QT"
          value={medidas.qt}
          onChange={(v) => setMedidas({ ...medidas, qt: v })}
          unit="ms"
          onCalculate={(q) => handleCalcularIntervalo(q, "qt")}
          calculationMode={modoCalculo.qt}
          setCalculationMode={(v) => setModoCalculo({ ...modoCalculo, qt: v })}
          quadrados={quadrados.qt}
          setQuadrados={(v) => setQuadrados({ ...quadrados, qt: v })}
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

        {/* NOVOS CAMPOS: D1 e aVF */}
        <div className="measure-field">
          <label>D1</label>
          <div className="measure-input-group">
            <input
              type="number"
              value={medidas.d1}
              onChange={(e) => setMedidas({ ...medidas, d1: e.target.value })}
              placeholder="0"
              step="0.1"
            />
            <span className="unit-label">mV</span>
          </div>
        </div>

        <div className="measure-field">
          <label>aVF</label>
          <div className="measure-input-group">
            <input
              type="number"
              value={medidas.avf}
              onChange={(e) => setMedidas({ ...medidas, avf: e.target.value })}
              placeholder="0"
              step="0.1"
            />
            <span className="unit-label">mV</span>
          </div>
        </div>

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
        <span className="info-icon">ℹ️</span>
        <span>
          Clique em □ para calcular por quadrados pequenos. FC = 1500/quadrados.
          Intervalos = quadrados × 40ms. Eixo calculado automaticamente via D1 e
          aVF.
        </span>
      </div>
    </section>
  );
};

export default MedidasECG;
