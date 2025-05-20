import { useState } from 'react';

export default function StepInfissi({ onNext, onBack, formData }) {
  const [servizio7, setServizio7] = useState(formData.servizio7 || '');

  const handleNext = () => {
    // Campo facoltativo, nessun errore
    onNext({ servizio7 });
  };

  return (
    <div className="space-y-6 bg-white mx-auto h-[450px] flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 font-display">
        Ci sono dettagli che vuoi raccontarci?
        </h2>

        <div className="border-2 border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-50 transition-colors duration-300">
          <textarea
            name="servizio7"
            value={servizio7}
            onChange={(e) => setServizio7(e.target.value)}
            rows="5"
            placeholder="Scrivi qui i dettagli (facoltativo)"
            className="w-full bg-transparent outline-none resize-none text-gray-700 font-display placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-display font-semibold"
        >
          Indietro
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors font-display font-semibold"
        >
          Avanti
        </button>
      </div>
    </div>
  );
}
