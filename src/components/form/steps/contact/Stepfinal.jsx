import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LeDOjsrAAAAAJUL3f7_qmAojJE7jVagDZ43W5Dh"; // sostituisci con la tua chiave site key

export default function StepFinal({ formData, onSubmit, onBack }) {
  const recaptchaRef = useRef(null);

  const [localData, setLocalData] = useState({
    nome: '',
    cognome: '',
    email: ''
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    setErrorMsg(null);
  };

  const handleClick = async () => {
    
    setErrorMsg(null);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData)
      });

      const result = await response.json();
      console.log("Risposta da send.php:", result);

      if (result.success) {
        setIsSubmitted(true);
        recaptchaRef.current.reset();
        setCaptchaToken(null);
        if (onSubmit && typeof onSubmit === 'function') {
          onSubmit(localData);
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
      {isSubmitted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">Grazie per aver inviato il modulo!</h2>
          <p className="mt-4">Ti ricontatteremo al più presto.</p>
        </div>
      ) : (
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

          <div style={{ marginTop: '1rem' }}>
            <ReCAPTCHA
              sitekey={SITE_KEY}
              onChange={handleCaptchaChange}
              ref={recaptchaRef}
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
      )}
    </div>
  );
}
