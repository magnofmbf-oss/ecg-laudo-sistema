import React from 'react';

const MeasureField = ({ 
  label, 
  value, 
  onChange, 
  unit, 
  calculated = false, 
  onCalculate, 
  calculationMode, 
  setCalculationMode, 
  quadrados, 
  setQuadrados 
}) => (
  <div className="measure-field">
    <label>{label}</label>
    <div className="measure-input-group">
      {calculationMode ?  (
        <>
          <input
            type="number"
            value={quadrados}
            onChange={(e) => {
              setQuadrados(e.target. value);
              if (onCalculate && e.target.value) {
                onCalculate(e.target.value);
              }
            }}
            placeholder="Quadr."
            className="quadrados-input"
          />
          <span className="unit-label">□</span>
          <button 
            className="calc-toggle active"
            onClick={() => setCalculationMode(false)}
            title="Inserir valor direto"
          >
            ⇄
          </button>
        </>
      ) : (
        <>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="0"
            className={calculated ? "calculated" : ""}
          />
          <span className="unit-label">{unit}</span>
          {onCalculate && (
            <button 
              className="calc-toggle"
              onClick={() => setCalculationMode(true)}
              title="Calcular por quadrados"
            >
              □
            </button>
          )}
        </>
      )}
    </div>
  </div>
);

export default MeasureField;