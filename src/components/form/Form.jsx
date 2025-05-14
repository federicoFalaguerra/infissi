import React, { useState } from 'react';
import Step1 from './steps/Step1.jsx';
import Stepinfissi2 from './steps/infissi/Step2.jsx';
import Stepinfissi3 from './steps/infissi/Step3.jsx';
import Stepinfissi4 from './steps/infissi/Step4.jsx';
import Stepinfissi5 from './steps/infissi/Step5.jsx';



import StepFinal from './steps/contact/Stepfinal.jsx';

export default function Form() {
  const [stepIndex, setStepIndex] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stepMap = {
    infissi: [Stepinfissi2, Stepinfissi3, Stepinfissi4, Stepinfissi5],
    // altre categorie...
  };

  const currentCategorySteps = stepMap[categoria] || [];
  const totalSteps = 1 + currentCategorySteps.length + 1; // Step1 + categoria + StepFinal
  const currentStepNumber = stepIndex + 1;
  const progressPercent = Math.round((currentStepNumber / totalSteps) * 100);

  const goNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStepIndex(prev => prev + 1);
  };

  const goBack = () => setStepIndex(prev => prev - 1);

  const handleFinalSubmit = (e, data) => {
    e.preventDefault();
    const finalData = { ...formData, ...data };
    console.log("Dati finali raccolti:", finalData);
    setIsSubmitted(true);
  };

  const renderStep = () => {
    if (isSubmitted) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">Grazie per aver inviato il modulo!</h2>
          <p className="mt-4">Ti ricontatteremo al più presto.</p>
        </div>
      );
    }

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        {stepIndex === 0 && (
          <Step1
            onNext={(data) => {
              setCategoria(data.servizio);
              goNext(data);
            }}
            formData={formData}
          />
        )}

        {stepIndex > 0 && stepIndex <= currentCategorySteps.length && (
          (() => {
            const StepComponent = currentCategorySteps[stepIndex - 1];
            return StepComponent ? (
              <StepComponent
                onNext={goNext}
                onBack={goBack}
                formData={formData}
              />
            ) : null;
          })()
        )}

        {stepIndex === currentCategorySteps.length + 1 && (
          <StepFinal
            formData={formData}
            onBack={goBack}
            onSubmit={(data) => handleFinalSubmit(event, data)}
          />
        )}
      </form>
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg space-y-6 my-203">
      {!isSubmitted  && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      )}

      {renderStep()}
    </div>
  );
}
