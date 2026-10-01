import { GeneratedItinerary, ChatMessage } from "../types";

export const generateAdventureItinerary = async (
  days: number,
  groupSize: number,
  category: string,
  programName: string,
  targetAudience: string,
  focus: string,
  addons: string[]
): Promise<GeneratedItinerary> => {
  try {
    const response = await fetch('/api/generate-itinerary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        days,
        groupSize,
        category,
        programName,
        targetAudience,
        focus,
        addons
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.items && Array.isArray(data.items)) {
        return data as GeneratedItinerary;
      }
    }
    throw new Error(`Failed to generate itinerary: ${response.status}`);
  } catch (error) {
    console.warn("Server itinerary route unavailable or errored, using high-impact fallback:", error);
    return {
      title: `${programName} Mission`,
      theme: "Resilience & Cohesion",
      estimatedCost: 8500,
      items: [
        { id: "1", time: "08:00", activity: "Strategic Briefing", category: "social", description: "Standard field deployment, safety protocol review, and gear inspection." },
        { id: "2", time: "11:00", activity: "Ridge Challenge", category: "physical", description: "Testing group dynamics and terrain navigation." },
        { id: "3", time: "15:00", activity: "Field Reflection & Debrief", category: "spiritual", description: "Spiritual and behavioral application of the physical hurdles." }
      ]
    };
  }
};

export const chatWithConsultant = async (_history: ChatMessage[], _message: string): Promise<string> => {
  return "Cross Connect Africa: Please contact our official Kenya desk on WhatsApp at +254 710 974 670 for live inquiries.";
};
