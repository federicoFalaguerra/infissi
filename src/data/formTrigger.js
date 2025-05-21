// File: public/js/formTrigger.js

// Funzione che inizializza i listener per le CTA
function initFormTriggers() {
    // Seleziona tutti i pulsanti CTA con la classe appropriata
    const ctaButtons = document.querySelectorAll('[data-form-trigger]');
    
    // Aggiungi l'event listener a ciascun pulsante
    ctaButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        console.log('cliccato')
        e.preventDefault();
        
        // Emetti l'evento per aprire il modal
        const event = new CustomEvent('openFormModal');
        document.dispatchEvent(event);
      });
    });
  }
  
  // Esegui l'inizializzazione quando il DOM è completamente caricato
  document.addEventListener('DOMContentLoaded', initFormTriggers);