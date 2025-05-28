import { useState } from 'react';


export default function StepInfissi({ onNext, onBack, formData }) {
  const [servizio2, setServizio2] = useState(formData.servizio2 || '');
  const [error, setError] = useState('');


  const handleNext = () => {
    if (!servizio2) {
    setError('Fai una scelta per continuare.');
      return;
    }

    setError('');
    onNext({ servizio2 });
  };

  return (
    <div className="space-y-6 bg-white mx-auto h-[450px] flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h2 className='text-2xl font-semibold text-gray-800'>Di che servizio hai bisogno? </h2>
        {['Sostituzione finestre', 'Installazione nuove finestre (casa nuova)'].map((option) => (
          <label key={option} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
            servizio2 === option ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-200'
          } hover:bg-green-50`}>
            <input
              type="radio"
              name="servizio"
              value={option}
              checked={servizio2 === option}
              onChange={() => {setServizio2(option); setError('');}}
              className='w-5 h-5 accent-green-600 min-w-5 min-h-5'
            />
            <span className='text-lg text-gray-700 font-display font-semibold'>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
          </label>
        ))}
        {error && <p className="text-red-600 text-sm mt-1 font-display">{error}</p>}
      </div>


      <div className=" flex justify-end">
       
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors font-display font-semibold hover:cursor-pointer"
        >
          Avanti
        </button>
      </div>
    </div>
  );
}
