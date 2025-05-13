import React, { useState, useEffect } from 'react';

export default function StepFinal({ formData, onSubmit, onBack }) {
  const [localData, setLocalData] = useState({
    nome: '',
    cognome: '',
    email: ''
  });

  useEffect(() => {
    setLocalData(prev => ({
      ...prev,
      ...formData
    }));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(localData);
    } else {
      console.error("onSubmit non è una funzione");
    }
  };

  return (
    <div>
      <h2>Inserisci i tuoi dati</h2>
      <div>
        <label>Nome:</label>
        <input name="nome" value={localData.nome} onChange={handleChange} required />
      </div>
      <div>
        <label>Cognome:</label>
        <input name="cognome" value={localData.cognome} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input name="email" type="email" value={localData.email} onChange={handleChange} required />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button type="button" onClick={onBack}>Indietro</button>
        <button type="button" onClick={handleClick} style={{ marginLeft: '1rem' }}>Invia</button>
      </div>
    </div>
  );
}
