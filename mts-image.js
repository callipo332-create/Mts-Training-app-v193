export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Metodo non consentito" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "OPENAI_API_KEY non configurata sul server" });
    return;
  }

  try {
    const { prompt, quality = "high", aspect = "3:4" } = req.body || {};
    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      res.status(400).json({ error: "Prompt mancante" });
      return;
    }

    const size = aspect === "3:4" ? "1024x1536" : "1024x1024";

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: prompt.trim(),
        size,
        quality,
        n: 1
      })
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({
        error: data?.error?.message || "Errore generazione immagine"
      });
      return;
    }

    const item = data?.data?.[0];
    if (item?.b64_json) {
      res.status(200).json({ image: `data:image/png;base64,${item.b64_json}` });
      return;
    }

    if (item?.url) {
      res.status(200).json({ image_url: item.url });
      return;
    }

    res.status(502).json({ error: "Nessuna immagine restituita dal modello" });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Errore server" });
  }
}
