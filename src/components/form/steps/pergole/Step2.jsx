import { useState } from 'react';

export default function StepPergole1({ onNext, onBack, formData }) {
  const [giardino, setGiardino] = useState(formData.giardino || '');

  const handleNext = () => {
    if (!giardino) {
      alert('Compila tutti i campi per continuare.');
      return;
    }

    onNext({ tipoInfisso, materiale });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Dettagli sugli infissi</h2>

      <div className="flex flex-col gap-2">
        <p>Hai un giardino?</p>
        {['si', 'no'].map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              name="tipoInfisso"
              value={option}
              checked={giardino === option}
              onChange={() => setGiardino(option)}
            />
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </label>
        ))}
      </div>

  
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Indietro
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Avanti
        </button>
      </div>
    </div>
  );
}
