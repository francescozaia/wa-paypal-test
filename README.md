# Carrello PayPal

## Prerequisiti

L'applicazione utilizza un server [node](https://nodejs.org), e [npm](https://www.npmjs.com/) per gestire dipendenze di progetto.
Node versione 4 dovrebbe essere sufficiente; per verificare la versione installata lanciare `node -v` da riga di comando.
E' possibile scaricare node da [qui](https://nodejs.org/en/download/), l'installazione include npm.

## Installazione

Scaricare lo zip o effettuare un `git clone` del repository in locale.

Come ogni altro software in node, richiede l'utilizzo del comando [`install`](https://docs.npmjs.com/cli/install) di `npm`. Lanciare quindi:

        npm install

## Lanciare il server

Prima di lanciare il server, *assicurarsi di avere impostato le variabili di ambiente fornite separatamente*, dopodiché lanciare:

        npm start

A questo punto, node dovrebbe rendere disponibile l'accesso a [http://localhost:3000](http://localhost:3000).