export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "OPENAI_API_KEY non configurata sul server"
    });
  }

  try {
    const {
      prompt,
      quality = "high",
      aspect = "3:4"
    } = req.body || {};

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return res.status(400).json({ error: "Prompt mancante" });
    }

    const sizeMap = {
      "1:1": "1024x1024",
      "3:4": "1024x1536",
      "4:3": "1536x1024"
    };

    const size = sizeMap[aspect] || "1024x1536";

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt: prompt.trim(),
          size,
          quality
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "Errore durante la generazione dell'immagine"
      });
    }

    const image = data?.data?.[0];

    if (!image) {
      return res.status(500).json({
        error: "Nessuna immagine ricevuta"
      });
    }

    return res.status(200).json({
      ok: true,
      image: image.b64_json || null,
      url: image.url || null
    });

  } catch (error) {
    console.error("MTS IMAGE ERROR:", error);

    return res.status(500).json({
      error: "Errore interno del server"
    });
  }
}
