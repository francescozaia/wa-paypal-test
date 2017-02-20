# Carrello PayPal

## Prerequisiti

L'applicazione utilizza un server [nodejs](https://nodejs.org), e [npm](https://www.npmjs.com/) per gestire dipendenze di progetto.

E' richiesta **nodejs versione 6**; per verificare la versione installata lanciare `node -v` da riga di comando; se è inferiore a 6, è necessario procedere ad un update. E' possibile scaricare node da [qui](https://nodejs.org/en/download/), l'installazione include npm.

## Installazione

Scaricare lo zip o effettuare un `git clone` del repository in locale.

Come ogni altro software in node, richiede l'utilizzo del comando [`install`](https://docs.npmjs.com/cli/install) di `npm`. Lanciare quindi:

        npm install

## Lanciare il server

Prima di lanciare il server, **assicurarsi di avere impostato le variabili di ambiente fornite separatamente**, dopodiché lanciare:

        npm start

A questo punto, node dovrebbe rendere disponibile l'accesso a [http://localhost:3000](http://localhost:3000).

## Importante: Come anticipato, l'applicazione richiede ancora alcune attività:
- ottimizzazione/ripulitura codice Javascript, sia lato server che lato client
- stesura documentazione di massima sul perché dell'utilizzo di node.js e dei framework scelti, e possibili improvement
- volevo provare a rimuovere la dipendenza da nodemailer per una più ampia compatibilità, visto che al momento richiede node versione 6
- aggiunta test (dato il breve tempo di lavorazione - 1 giorno - non ho lavorato test-driven)
- varie ed eventuali per migliorare la chiarezza generale
