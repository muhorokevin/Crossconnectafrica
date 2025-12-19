import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedItinerary, ChatMessage } from "../types";

const RESPONSE_SCHEMA = {
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

export const generateAdventureItinerary = async (
  days: number,
  groupSize: number,
  category: string,
  programName: string,
  targetAudience: string,
  focus: string,
  addons: string[]
): Promise<GeneratedItinerary> => {
  const modelId = 'gemini-3-flash-preview';
  const prompt = `Create a detailed ${days}-day adventure itinerary for a group of ${groupSize} people in Kenya.
  
  CONTEXT:
  - Provider: Cross Connect Africa.
  - Service Category: "${category}"
  - Program Name: "${programName}"
  - Audience: "${targetAudience}"
  - Mission Focus: "${focus}"
  - Add-ons: ${addons.join(', ') || "None"}

  MISSION REQUIREMENTS:
  1. Title reflecting "Rugged Refinement".
  2. Balanced spiritual reflection, physical challenge, and social bonding.
  3. Professional, structured daily field log.
  4. Cost estimate in KES per person.`;

  try {
    // Initializing GoogleGenAI using a fresh instance per call as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: "You are 'Kevin Muhoro', the Founder and Lead Facilitator for Cross Connect Africa in Nairobi. You are rugged, wise, and committed to character building. You use Kenyan references. If asked about prices, direct them to the 'Get Quote' calculator or the Shop. Keep responses concise and high-end.",
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedItinerary;
    }
    throw new Error("Empty response from AI");
  } catch (error: any) {
    console.error("Itinerary Generation Error:", error);
    // Return a graceful fallback if the API fails
    return {
      title: `${programName} Mission`,
      theme: "Resilience & Connection",
      estimatedCost: 8500,
      items: [
        { id: "1", time: "08:00", activity: "Strategic Briefing", category: "social", description: "Standard field deployment and gear inspection." },
        { id: "2", time: "11:00", activity: "Ridge Challenge", category: "physical", description: "Testing group dynamics and terrain navigation." },
        { id: "3", time: "15:00", activity: "Field Reflection", category: "spiritual", description: "Spiritual application of the morning's physical hurdles." }
      ]
    };
  }
};

export const chatWithConsultant = async (history: ChatMessage[], message: string): Promise<string> => {
  const modelId = 'gemini-3-flash-preview';
  
  try {
    // Create a new instance right before the call to ensure up-to-date configuration
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: "You are 'Kevin Muhoro', Founder of Cross Connect Africa. You are rugged, professional, and use Kenyan references. You mentor users on adventure, character, and mission strategy. If asked about technical things like 'Failed to Fetch', explain that you are on a mountain ridge and they should check their 'API Key Environment Variables' in Vercel settings.",
      }
    });

    const response = await chat.sendMessage({ message });
    return response.text || "The signal is dropping on the ridge. Say again?";
  } catch (error: any) {
    console.error("Consultant Chat Error:", error);
    if (error.message?.includes("API_KEY")) {
      return "Critical Alert: My radio (API Key) is not configured in your deployment settings. Please add the API_KEY to your Vercel project environment variables.";
    }
    return "The mountains are calling, but my connection is fading. Check your network or API settings.";
  }
};
