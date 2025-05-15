import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LdfGTsrAAAAAM58PQ5HZ0GejseGgFpKeEU2kGup"; // ← sostituisci con la tua chiave site key


export default function StepFinal({ formData, onSubmit, onBack }) {
  const recaptchaRef = useRef(null);

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
    const recaptchaValue = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();

    const finalData = { ...localData, 'g-recaptcha-response': recaptchaValue };

    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(finalData);
    }

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
          ...localData,
          'g-recaptcha-response': recaptchaValue

        })
      });
  
      const result = await response.json();
  
      if (result.success) {
        //alert("Email inviata con successo!");
        if (onSubmit && typeof onSubmit === 'function') {
          onSubmit(localData); // cambia stato a isSubmitted nel componente padre
        }
      } else {
        //alert("Errore: " + (result.message || "Invio fallito."));
      }
    } catch (error) {
      //alert("Si è verificato un errore: " + error.message);
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
      <ReCAPTCHA
          sitekey={SITE_KEY}
          size="invisible"
          ref={recaptchaRef}
        />
    </div>
  );
}
