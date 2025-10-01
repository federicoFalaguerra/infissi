# 🏡 Infissi&Infissi

**Demo Online:** https://landing.infissieinfissi.it/cremona/

Un progetto web performante e professionale, focalizzato sulla presentazione di prodotti e servizi nel settore degli infissi. Sviluppato come vetrina per il mio portfolio, dimostra l'abilità nell'uso di **architetture front-end ibride** per bilanciare velocità di caricamento e complessità di interazione.

---

## ✨ Punti di Forza e Architettura Ibrida

Questo progetto eccelle nell'integrazione intelligente di tecnologie, sfruttando il meglio di ciascuna per raggiungere performance ottimali e un'esperienza utente ricca, implementando il pattern **Islands Architecture** di Astro.

### 🚀 Astro: Performance Estreme e SEO

Il sito principale (pagine statiche, schede prodotto, landing page) è gestito interamente da **Astro.js**, che garantisce:

* **Velocità Massima:** La maggior parte delle pagine caricano con **Zero JavaScript** inviato al browser.
* **Ottimizzazione SEO:** Miglior punteggio Lighthouse possibile grazie al **Server-Side Rendering (SSR)** statico.

### ⚛️ React.js: Complessità di Stato Isolata

La funzionalità più critica e complessa, il **Form a Step per il preventivo**, è stata intenzionalmente sviluppata in **React.js**.

* **Gestione dello Stato (State Management):** React è la scelta ideale per la logica complessa richiesta da un form multi-step.
* **Partial Hydration:** Il componente React viene **"idratato"** (attivato con il JS necessario) *solo* sulla porzione di pagina dove si trova il form, isolando la logica complessa e **non rallentando** il resto del sito statico.

---

## 🛠️ Stack Tecnologico Dettagliato

Una panoramica delle tecnologie utilizzate, evidenziando il loro ruolo specifico nel progetto:

| Tecnologia | Ruolo | Dettaglio Chiave per il Recruiter |

| **Astro.js** | Base del Progetto (Routing, Struttura, Static Content) | Orchestrazione dell'architettura e hosting dei componenti React. |
| **React.js** | Componente Interattivo (Form a Step) | Abilità nell'isolare e gestire logica complessa e stato utente. |
| **JavaScript/TypeScript** | Linguaggio Principale | Linguaggio comune utilizzato per la logica di entrambi i framework. |
| **Tailwind CSS** | Styling e Design System | Sviluppo rapido, design responsive e mantenimento di un codice CSS snello. |

---

## ⚙️ Istruzioni di Setup Locale

Per esaminare la struttura del codice e avviare l'applicazione sulla tua macchina.

### Prerequisiti

È necessario avere installato **Node.js (versione 16 o superiore)**.

### 1. Clonazione del Progetto

```bash
git clone https://github.com/federicoFalaguerra/infissi.git
cd Infissi-Infissi
