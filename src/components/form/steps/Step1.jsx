import { useState } from 'react';

export default function Step1({ onNext, formData }) {
  const [servizio, setServizio] = useState(formData.servizio || '');
  const [error, setError] = useState('');


  const handleNext = () => {
    if (!servizio) {
    setError('Fai una scelta per continuare.');
      return;
    }

    setError('');
    onNext({ servizio });
  };


  const options = [
    { id: 'infissi', label: 'Infissi e serramenti' },
    { id: 'tenda-veranda', label: 'Tenda veranda 4 stagioni' },
    { id: 'tende', label: 'Tende da sole' },
    { id: 'pergole', label: 'Pergole' },
    { id: 'zanzariere', label: 'Zanzariere' }
  ];

  return (
    <div className="space-y-6 bg-white rounded-lg mx-auto h-[500px] flex flex-col justify-between">
      <h2 className="text-2xl font-semibold text-gray-800">Che tipo di servizio ti interessa?</h2>

      <div className="flex flex-col gap-4">
      {options.map(({ id, label }) => (
        <label
          key={id}
          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-300 font-display font-semibold ${
            servizio === id ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-200'
          } hover:bg-green-50`}
        >
          <input
            type="radio"
            name="servizio"
            value={id}
            checked={servizio === id}
            onChange={() => {setServizio(id);  setError('');}}
            className="w-5 h-5 accent-green-600 min-w-5 min-h-5"
          />
          <span className="text-lg text-gray-700">{label}</span>
        </label>
      ))}
      {error && <p className="text-red-600 text-sm mt-1 font-display">{error}</p>}
      </div>

      <div className="flex justify-end">
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
