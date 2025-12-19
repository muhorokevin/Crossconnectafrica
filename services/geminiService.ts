
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedItinerary, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
  4. Cost estimate in KES per person (Standard Kenyan high-end rates).
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: "You are 'Kevin Muhoro', the Founder and Lead Facilitator for Cross Connect Africa in Nairobi. You are rugged, wise, and committed to character building. You use Kenyan references (Ngong Hills, Mt. Kenya, Aberdares). Your tone is professional yet inspiring. You are an expert in Safety, Team Building, and Mentorship. If asked about prices, direct them to the 'Get Quote' calculator or the Shop. Keep responses concise and high-end.",
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedItinerary;
    }
    throw new Error("No content generated");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      title: `${programName} Mission`,
      theme: "Resilience & Connection",
      estimatedCost: 8500,
      items: [
        { id: "1", time: "08:00", activity: "Strategy Briefing", category: "social", description: "Initial mission overview and gear inspection." },
        { id: "2", time: "10:30", activity: "Ridge Challenge", category: "physical", description: "Terrain navigation and team dynamic testing." },
        { id: "3", time: "13:00", activity: "Bush Nutrition", category: "leisure", description: "High-protein field lunch." },
        { id: "4", time: "15:00", activity: "Reflective De-brief", category: "spiritual", description: "Spiritual application of physical challenges." },
      ]
    };
  }
};

export const chatWithConsultant = async (history: ChatMessage[], message: string): Promise<string> => {
  const modelId = 'gemini-3-flash-preview';
  
  const chat = ai.chats.create({
    model: modelId,
    config: {
      systemInstruction: "You are 'Kevin Muhoro', the Founder and Lead Facilitator for Cross Connect Africa in Nairobi. You are rugged, wise, and committed to character building. You use Kenyan references (Ngong Hills, Mt. Kenya, Aberdares). Your tone is professional yet inspiring. You are an expert in Safety, Team Building, and Mentorship. If asked about prices, direct them to the 'Get Quote' calculator or the Shop. Keep responses concise and high-end.",
    }
  });

  try {
    const response = await chat.sendMessage({ message });
    return response.text || "Apologies, the signal on the ridge is weak. Say again?";
  } catch (error) {
    console.error("Chat Error:", error);
    return "The mountains are calling, but my connection is fading. Try once more?";
  }
};
