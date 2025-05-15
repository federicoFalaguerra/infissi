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

  const handleClick = async () => {
    if (!localData.nome || !localData.cognome || !localData.email) {
      alert("Compila tutti i campi.");
      return;
    }
  
    try {
      const response = await fetch("https://landing.infissieinfissi.it/api/send.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          ...localData
        })
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert("Email inviata con successo!");
        if (onSubmit && typeof onSubmit === 'function') {
          onSubmit(localData); // cambia stato a isSubmitted nel componente padre
        }
      } else {
        alert("Errore: " + (result.message || "Invio fallito."));
      }
    } catch (error) {
      alert("Si è verificato un errore: " + error.message);
      console.error(error);
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
