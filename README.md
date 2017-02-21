# Carrello PayPal

Ho creato l'applicazione utilizzando un server in NodeJS, in quanto rapido da istanziare e leggero.
L'intero sviluppo ha occupato non più di 6 ore, per questo alcune scelte non sono ottimizzare per un'eventuale deploy in produzione. Sono ovviamente disponibile a discuterne in caso di richiesta. In particolare:
- ho incluso alcuni pacchetti node per velocizzare un po' lo sviluppo, tra cui `nodemailer` per inviare email, `pug` per templating HTML e `lodash` per mappe e filtri su oggetti.
- ho utilizzato una libreria CSS/JS (`materialize`)[https://materializecss.com] per rendere il frontend meno asettico, che a sua volta richiede jQuery.*
- non ho lavorato TDD, per questo ho lasciato da parte la stesura di test. Di certo avrei messo sotto test le funzioni nel file `routes.js`.

_* nota: è possibile rimuovere l'inclusione di jQuery e delle librerie materialize CSS e JS dal file `/views/layout/main.pug` senza alcun impatto "funzionale" sulla web app._

## Prerequisiti

Come da premessa, l'applicazione utilizza un server [nodejs](https://nodejs.org), e [npm](https://www.npmjs.com/) per gestire dipendenze di progetto.

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
- stesura documentazione di massima sul perché dell'utilizzo di node.js e dei framework scelti, e possibili improvement
- rimuovere methodOverride, bodyParser, cookieParser
