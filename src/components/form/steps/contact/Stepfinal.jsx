import React, { useState, useEffect } from 'react';

export default function StepFinal({ formData, onSubmit, onBack, setIsSubmitted }) {
  const [localData, setLocalData] = useState({
    nome: '',
    email: '',
    cap: '',
    phone: '',
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
    <div className='space-y-6 bg-white mx-auto h-[450px] flex flex-col justify-between'>
      {/* Rimosso il tag form qui */}
      
      <div>
      <h2 className='text-2xl font-semibold text-gray-800 font-display'>Inserisci i tuoi dati per il preventivo
      </h2>
      <div className='mt-4'>
          <input name="cap" value={localData.cap} onChange={handleChange} className='border-2 border-gray-200 rounded-lg p-2 bg-gray-50 hover:bg-gray-50 transition-colors duration-300 w-full font-display font-semibold' placeholder='Il tuo CAP' required  />
        </div>
        <div className='mt-4'>
          <input name="nome" value={localData.nome} onChange={handleChange} className='border-2 border-gray-200 rounded-lg p-2 bg-gray-50 hover:bg-gray-50 transition-colors duration-300 w-full font-display font-semibold' placeholder='Il tuo Nome' required  />
        </div>
        <div className='mt-4'>
          <input name="email" type="email" value={localData.email} onChange={handleChange} required className='border-2 border-gray-200 rounded-lg p-2 bg-gray-50 hover:bg-gray-50 transition-colors duration-300 w-full font-display font-semibold' placeholder='La tua Email' />
        </div>
        <div className='mt-4'>
          <input name="phone" type="tel" value={localData.phone} onChange={handleChange} required className='border-2 border-gray-200 rounded-lg p-2 bg-gray-50 hover:bg-gray-50 transition-colors duration-300 w-full font-display font-semibold' placeholder='Il tuo numero di Telefono' />
        </div>
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

      <div className='flex justify-between'>
        <button type="button" onClick={onBack} disabled={isSubmitting} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-display font-semibold">Indietro</button>
        <button type="button" onClick={handleClick} disabled={isSubmitting}  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors font-display font-semibold">
          {isSubmitting ? "Invio in corso..." : "Invia"}
        </button>
      </div>
    </div>
  );
}