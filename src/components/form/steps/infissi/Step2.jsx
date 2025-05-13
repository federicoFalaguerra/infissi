import { useState } from 'react';

export default function StepInfissi({ onNext, onBack, formData }) {
  const [servizio, setServizio] = useState(formData.servizio || '');

  const handleNext = () => {
    if (!servizio) {
      alert('Compila tutti i campi per continuare.');
      return;
    }

    onNext({ servizio });
  };

  return (
    <div className="space-y-6 bg-white mx-auto h-[500px] flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h2 className='text-2xl font-semibold text-gray-800'>Di che servizio hai bisogno? </h2>
        {['Sostituzione finestre', 'Installazione nuove finestre (casa nuova)'].map((option) => (
          <label key={option} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
            servizio === option ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-200'
          } hover:bg-blue-50`}>
            <input
              type="radio"
              name="servizio"
              value={option}
              checked={servizio === option}
              onChange={() => setServizio(option)}
              className='w-5 h-5 accent-green-600'
            />
            <span className='text-lg text-gray-700 font-display font-semibold'>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
          </label>
        ))}
      </div>


      <div className=" flex justify-between">
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
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          Avanti
        </button>
      </div>
    </div>
  );
}
