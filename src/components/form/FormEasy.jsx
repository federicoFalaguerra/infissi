import React, { useState } from 'react';
import Lottie from 'lottie-react';
import successAnimation from '../../assets/animations/success.json';

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

  const handleFinalSubmit = () => {
    // Funzione vuota - non fare nulla qui perché l'invio avviene in StepFinal
    setIsSubmitted(true);
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
          <Lottie 
              animationData={successAnimation}
              loop={false}
              autoplay={true}
            />
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          {stepIndex === totalSteps - 1 ? (
          <CurrentStep
            onSubmit={handleFinalSubmit}
            onBack={handleBack}
            formData={formData}
            setIsSubmitted={setIsSubmitted}
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