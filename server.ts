import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Structured Schema for Itinerary Generation
const ITINERARY_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    theme: { type: Type.STRING },
    estimatedCost: { type: Type.NUMBER },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          time: { type: Type.STRING },
          activity: { type: Type.STRING },
          category: { type: Type.STRING, enum: ['spiritual', 'physical', 'social', 'leisure'] },
          description: { type: Type.STRING }
        },
        required: ['id', 'time', 'activity', 'category', 'description']
      }
    }
  },
  required: ['title', 'items', 'theme', 'estimatedCost']
};

// API Route: Server-side Gemini Itinerary Generation
app.post('/api/generate-itinerary', async (req, res) => {
  const {
    days = 1,
    groupSize = 20,
    category = 'Team Building',
    programName = 'Corporate Mission',
    targetAudience = 'Teams',
    focus = 'Team Resilience',
    addons = []
  } = req.body || {};

  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn('[Server] No API_KEY found in server environment. Returning structured template fallback.');
    return res.json({
      title: `${programName} Mission`,
      theme: "Resilience & Strategic Synergy",
      estimatedCost: 8500,
      items: [
        { id: "1", time: "08:00", activity: "Strategic Deployment Briefing", category: "social", description: "Standard field deployment, safety protocol review, and gear inspection." },
        { id: "2", time: "10:30", activity: "Field Synergy Challenge", category: "physical", description: "Interactive obstacle simulations testing group problem-solving and trust under pressure." },
        { id: "3", time: "13:00", activity: "Mission Fellowship Lunch", category: "social", description: "Communal meal and informal team bonding in scenic natural grounds." },
        { id: "4", time: "14:30", activity: "Facilitated Behavioral Debrief", category: "spiritual", description: "Guided debrief extracting workplace behavioral commitments from field exercises." }
      ]
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Create a detailed ${days}-day experiential adventure itinerary for a group of ${groupSize} participants in Kenya.
    
CONTEXT:
- Provider: Cross Connect Africa (Kenya)
- Service Category: "${category}"
- Program Name: "${programName}"
- Audience: "${targetAudience}"
- Mission Focus: "${focus}"
- Add-ons: ${Array.isArray(addons) && addons.length > 0 ? addons.join(', ') : "None"}

REQUIREMENTS:
1. Title reflecting authentic character and leadership growth.
2. Balanced reflection, physical challenge, and team cohesion.
3. Realistic schedule suitable for Kenyan deployment terrain.
4. Estimated cost in KES per participant.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are 'Kevin Muhoro', Founder and Lead Facilitator for Cross Connect Africa in Nairobi. You are rugged, wise, grounded, and committed to character building. Keep itinerary items practical, high-impact, and inspiring. Return pure JSON matching the response schema.",
        responseMimeType: "application/json",
        responseSchema: ITINERARY_RESPONSE_SCHEMA
      }
    });

    if (response.text) {
      const parsed = JSON.parse(response.text);
      return res.json(parsed);
    }

    throw new Error('Empty response from Gemini model');
  } catch (error: any) {
    console.error('[Server] Gemini Itinerary Error:', error?.message || error);
    // Graceful fallback so the client UI remains functional
    return res.json({
      title: `${programName} Mission`,
      theme: "Resilience & High-Trust Performance",
      estimatedCost: 8500,
      items: [
        { id: "1", time: "08:00", activity: "Strategic Alignment & Gear Brief", category: "social", description: "Facilitator-led orientation, safety overview, and goal-setting." },
        { id: "2", time: "11:00", activity: "Wilderness Team Challenge", category: "physical", description: "Outdoor team simulation navigating communication roadblocks." },
        { id: "3", time: "15:00", activity: "Reflective Synthesis & Debrief", category: "spiritual", description: "Translating field breakthroughs into Monday-morning operational pacts." }
      ]
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'cross-connect-africa-server' });
});

// Setup Vite middleware in dev or static serving in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), () => {
    console.log(`[Server] Cross Connect Africa running on port ${PORT} (Prod: ${isProd})`);
  });
}

startServer();
