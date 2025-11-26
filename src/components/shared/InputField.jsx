import React from 'react';

const InputField = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  required = false, 
  className = "" 
}) => (
  <div className={`input-field ${className}`}>
    <label>
      {label}
      {required && <span className="required">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;