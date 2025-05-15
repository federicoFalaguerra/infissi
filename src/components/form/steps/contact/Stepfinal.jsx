import React, { useState, useEffect } from 'react';

export default function StepFinal({ formData, onSubmit, onBack, setIsSubmitted }) {
  const [localData, setLocalData] = useState({
    nome: '',
    cognome: '',
    email: '',
    // Campo honeypot - i bot lo compileranno, gli umani no
    website: ''
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setErrorMsg(null);

    if (!localData.nome || !localData.cognome || !localData.email) {
      setErrorMsg("Per favore, compila tutti i campi.");
      return;
    }

    // Verifica honeypot - se il campo website è stato compilato, è probabilmente un bot
    if (localData.website) {
      // Fingiamo che l'invio sia andato a buon fine ma in realtà non inviamo nulla
      console.log("Honeypot attivato, probabile bot");
      if (onSubmit && typeof onSubmit === 'function') {
        onSubmit(localData);
      }
      if (setIsSubmitted && typeof setIsSubmitted === 'function') {
        setIsSubmitted(true);
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://landing.infissieinfissi.it/api/send.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localData)
      });

      const result = await response.json();
      console.log("Risposta da send.php:", result);

      if (result.success) {
        // Notifica il genitore che l'invio è avvenuto con successo
        if (onSubmit && typeof onSubmit === 'function') {
          onSubmit(localData);
        }
        
        // Aggiorna lo stato nel componente genitore
        if (setIsSubmitted && typeof setIsSubmitted === 'function') {
          setIsSubmitted(true);
        }
      } else {
        setErrorMsg(result.message || "Errore nell'invio del modulo, riprova più tardi.");
      }
    } catch (error) {
      setErrorMsg("Errore di rete, controlla la connessione.");
      console.error(error);
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
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
        
        {/* Campo honeypot nascosto con CSS */}
        <div style={{ position: 'absolute', left: '-5000px', ariaHidden: 'true' }}>
          <label>Website (non compilare questo campo):</label>
          <input 
            name="website" 
            tabIndex="-1" 
            value={localData.website} 
            onChange={handleChange} 
            autoComplete="off" 
          />
        </div>

        {errorMsg && (
          <div style={{ color: 'red', marginTop: '1rem' }}>
            {errorMsg}
          </div>
        )}

        <div style={{ marginTop: '1rem' }}>
          <button type="button" onClick={onBack} disabled={isSubmitting}>Indietro</button>
          <button type="button" onClick={handleClick} disabled={isSubmitting} style={{ marginLeft: '1rem' }}>
            {isSubmitting ? "Invio in corso..." : "Invia"}
          </button>
        </div>
      </form>
    </div>
  );
}