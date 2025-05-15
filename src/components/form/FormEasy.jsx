import React, { useState } from 'react';

import Stepinfissi2 from './steps/infissi/Step2.jsx';
import Stepinfissi3 from './steps/infissi/Step3.jsx';
import Stepinfissi4 from './steps/infissi/Step4.jsx';
import Stepinfissi5 from './steps/infissi/Step5.jsx';
import Stepinfissi6 from './steps/infissi/Step6.jsx';
import Stepinfissi7 from './steps/infissi/Step7.jsx';
import StepFinal from './steps/contact/Stepfinal.jsx';

export default function FormInfissiLineare() {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    Stepinfissi2,
    Stepinfissi3,
    Stepinfissi4,
    Stepinfissi5,
    Stepinfissi6,
    Stepinfissi7,
    StepFinal
  ];

  const totalSteps = steps.length;
  const progressPercent = Math.round(((stepIndex + 1) / totalSteps) * 100);
  const CurrentStep = steps[stepIndex];

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStepIndex(prev => prev + 1);
  };

  const handleBack = () => setStepIndex(prev => prev - 1);

  const handleFinalSubmit = async (data) => {
    const finalData = { ...formData, ...data };
    try {
      const response = await fetch('/api/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        setIsSubmitted(true);  // Mostra messaggio di successo solo se mail inviata correttamente
      } else {
        alert('Errore nell\'invio del modulo, riprova più tardi.');
        // Puoi anche impostare uno stato per mostrare un messaggio errore in pagina
      }
    } catch (error) {
      alert('Errore di rete, controlla la connessione.');
    }
  };
  

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg space-y-6 my-70">
      {!isSubmitted && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      )}

      {isSubmitted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">Grazie per aver inviato il modulo!</h2>
          <p className="mt-4">Ti ricontatteremo al più presto.</p>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          {stepIndex === totalSteps - 1 ? (
          <CurrentStep
            onSubmit={handleFinalSubmit}
            onBack={handleBack}
            formData={formData}
          />
        ) : (
          <CurrentStep
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
          />
        )}
        </form>
      )}
    </div>
  );
}
