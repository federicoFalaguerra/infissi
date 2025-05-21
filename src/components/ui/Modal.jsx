// File: src/components/ui/Modal.jsx
import React, { useEffect } from 'react';

/**
 * Componente Modal riutilizzabile
 * @param {boolean} isOpen - Indica se il modal è aperto
 * @param {function} onClose - Funzione da chiamare per chiudere il modal
 * @param {ReactNode} children - Contenuto del modal
 * @param {string} className - Classi CSS aggiuntive per il contenitore principale
 */
const Modal = ({ isOpen, onClose, children, className = '' }) => {
  // Previene lo scroll del body quando il modal è aperto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup quando il componente viene smontato
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Gestisce la chiusura del modal con il tasto ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Se il modal non è aperto, non renderizzare nulla
  if (!isOpen) return null;
  
  // Gestisce i click sul backdrop per chiudere il modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0000008f] bg-opacity-60 p-4 ${className}`}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Chiudi"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;