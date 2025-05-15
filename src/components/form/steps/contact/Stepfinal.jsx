import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LeDOjsrAAAAAJUL3f7_qmAojJE7jVagDZ43W5Dh";

export default function StepFinal({ formData, onSubmit, onBack }) {
  const recaptchaRef = useRef(null);

  const [localData, setLocalData] = useState({
    nome: '',
    cognome: '',
    email: ''
  });
  
  const [captchaToken, setCaptchaToken] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
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
    setErrorMsg(null);  // reset error on change
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    setErrorMsg(null); // reset error on captcha success
  };

  const handleClick = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!localData.nome || !localData.cognome || !localData.email) {
      setErrorMsg("Per favore, compila tutti i campi.");
      return;
    }

    if (!captchaToken) {
      setErrorMsg("Per favore, conferma di non essere un robot.");
      return;
    }

    setIsSubmitting(true);

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
        setSuccessMsg("Modulo inviato con successo!");
        if (onSubmit && typeof onSubmit === 'function') {
          onSubmit(localData);
        }
        recaptchaRef.current.reset();
        setCaptchaToken(null);
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

      {errorMsg && <div style={{ color: 'red', marginTop: '1rem' }}>{errorMsg}</div>}
      {successMsg && <div style={{ color: 'green', marginTop: '1rem' }}>{successMsg}</div>}

      <div style={{ marginTop: '1rem' }}>
        <button type="button" onClick={onBack} disabled={isSubmitting}>Indietro</button>
        <button type="button" onClick={handleClick} style={{ marginLeft: '1rem' }} disabled={isSubmitting}>
          {isSubmitting ? "Invio in corso..." : "Invia"}
        </button>
      </div>
    </div>
  );
}
