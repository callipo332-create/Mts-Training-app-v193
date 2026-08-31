MTS TRAINING APP 2.0 LITE V193 - ONLINE AI READY

Questo pacchetto contiene:
- index.html: app completa MTS
- api/mts-image.js: backend sicuro per generazione immagini
- vercel.json: configurazione deploy
- package.json

PUBBLICAZIONE RAPIDA SU VERCEL
1. Carica questa cartella in un repository GitHub.
2. Importa il repository su Vercel.
3. In Vercel > Settings > Environment Variables aggiungi:
   OPENAI_API_KEY = la tua chiave API OpenAI
4. Esegui Deploy.
5. Apri l'URL https://...vercel.app
6. In MTS WORLD > AI IMAGE GENERATOR premi ONLINE.
7. Scrivi il prompt e premi GENERA IMMAGINE PRO.

IMPORTANTE
- Non mettere mai OPENAI_API_KEY dentro index.html.
- Se apri index.html direttamente da Download/content://, il backend non esiste e la generazione online non può funzionare.
- Le immagini vengono generate dal server tramite /api/mts-image.
