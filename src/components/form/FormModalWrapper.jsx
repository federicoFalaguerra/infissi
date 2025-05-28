// File: src/components/form/FormModalWrapper.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import FormInfissiLineare from './FormEasy.jsx'; // Il tuo form esistente


/**
 * Wrapper che rende il form dentro un modal
 * Ascolta l'evento 'openFormModal' per aprire il modal
 */
const FormModalWrapper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Ascolta l'evento personalizzato per aprire il form
  useEffect(() => {
    const handleOpenFormEvent = () => {
      openModal();
    };
    
    // Registra l'event listener
    document.addEventListener('openFormModal', handleOpenFormEvent);
    
    // Cleanup dell'event listener quando il componente viene smontato
    return () => {
      document.removeEventListener('openFormModal', handleOpenFormEvent);
    };
  }, []);
  
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="py-2">
        <FormInfissiLineare />
      </div>
    </Modal>
  );
};

export default FormModalWrapper;