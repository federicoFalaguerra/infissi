import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LeDOjsrAAAAAJUL3f7_qmAojJE7jVagDZ43W5Dh"; // ← sostituisci con la tua chiave site key

export default function StepFinal({ formData, onSubmit, onBack }) {
  const recaptchaRef = useRef(null);

  const [localData, setLocalData] = useState({
    nome: '',
    cognome: '',
    email: ''
  });
  
  const [captchaToken, setCaptchaToken] = useState(null);

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

  // Questo viene chiamato quando l'utente clicca e completa il captcha
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleClick = async () => {
    if (!localData.nome || !localData.cognome || !localData.email) {
      alert("Compila tutti i campi.");
      return;
    }

    if (!captchaToken) {
      alert("Per favore, conferma di non essere un robot.");
      return;
    }

    const finalData = { ...localData, 'g-recaptcha-response': captchaToken };

    try {
      const response = await fetch("https://landing.infissieinfissi.it/api/send.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalData)
      });

      const result = await response.json();

      if (result.success) {
        if (onSubmit && typeof onSubmit === 'function') {
          onSubmit(localData); // cambia stato a isSubmitted nel componente padre
        }
        // reset captcha dopo invio corretto
        recaptchaRef.current.reset();
        setCaptchaToken(null);
      } else {
        alert("Errore nell'invio del modulo, riprova più tardi.");
      }
    } catch (error) {
      alert("Errore di rete, controlla la connessione.");
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
        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={handleCaptchaChange}
          ref={recaptchaRef}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button type="button" onClick={onBack}>Indietro</button>
        <button type="button" onClick={handleClick} style={{ marginLeft: '1rem' }}>Invia</button>
      </div>
    </div>
  );
}
