import React from "react";

const DualMeasureField = ({
  label,
  value,
  onChange,
  unit,
  quadrados,
  onQuadradosChange,
  quadradosToValue,
  valueToQuadrados,
  isFC = false, // FC tem lógica diferente (1500/quadrados ao invés de quadrados*40)
}) => {
  // Quando alterar o valor em unidade (ms ou bpm)
  const handleValueChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Calcula automaticamente os quadrados
    if (valueToQuadrados && newValue) {
      const calculatedQuadrados = valueToQuadrados(newValue);
      if (calculatedQuadrados !== null) {
        onQuadradosChange(calculatedQuadrados.toString());
      }
    } else if (!newValue) {
      onQuadradosChange("");
    }
  };

  // Quando alterar os quadrados
  const handleQuadradosChange = (e) => {
    const newQuadrados = e.target.value;
    onQuadradosChange(newQuadrados);

    // Calcula automaticamente o valor
    if (quadradosToValue && newQuadrados) {
      const calculatedValue = quadradosToValue(newQuadrados);
      if (calculatedValue !== null) {
        onChange(calculatedValue.toString());
      }
    } else if (!newQuadrados) {
      onChange("");
    }
  };

  return (
    <div className="measure-field dual-measure">
      <label>{label}</label>
      <div className="dual-input-container">
        {/* Campo de quadrados */}
        <div className="dual-input-group">
          <input
            type="number"
            value={quadrados}
            onChange={handleQuadradosChange}
            placeholder="0"
            step="0.5"
            className="quadrados-input"
          />
          <span className="unit-label">□</span>
        </div>

        {/* Seta indicativa */}
        <span className="dual-arrow">⇄</span>

        {/* Campo de valor (ms ou bpm) */}
        <div className="dual-input-group">
          <input
            type="number"
            value={value}
            onChange={handleValueChange}
            placeholder="0"
          />
          <span className="unit-label">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default DualMeasureField;
