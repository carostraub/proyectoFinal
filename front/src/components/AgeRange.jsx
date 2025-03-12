import React, { useState } from "react";

const AgeRange = ({ onChange }) => {
  const [edadMin, setEdadMin] = useState(18);
  const [edadMax, setEdadMax] = useState(50);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value < edadMax) {
      setEdadMin(value);
      onChange({ edadMin: value, edadMax });
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value > edadMin) {
      setEdadMax(value);
      onChange({ edadMin, edadMax: value });
    }
  };

  return (
    <div className="text-center mt-4">
      
      <div className="d-flex justify-content-center align-items-center gap-3">
        {/* Input de Edad Mínima */}
        <div>
          <label htmlFor="edadMin">Mín</label>
          <input
            type="range"
            id="edadMin"
            min="0"
            max="100"
            step="1"
            value={edadMin}
            onChange={handleMinChange}
            className="form-range"
          />
          <span>{edadMin} años</span>
        </div>

        {/* Input de Edad Máxima */}
        <div>
          <label htmlFor="edadMax">Máx</label>
          <input
            type="range"
            id="edadMax"
            min="0"
            max="100"
            step="1"
            value={edadMax}
            onChange={handleMaxChange}
            className="form-range"
          />
          <span>{edadMax} años</span>
        </div>
      </div>
    </div>
  );
};

export default AgeRange;
